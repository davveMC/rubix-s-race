// require("./js-QoL-main/js-QoL-main/array.js")
// require("./js-QoL-main/js-QoL-main/number.js")
const fs = require("fs")
const express = require("express")
const http = require("http")
const websocketServer = require("websocket").server
const { checkServerIdentity } = require("tls")
const { captureRejectionSymbol } = require("events")
// const { exit } = require("process")

const app = express()
const port = 8123 || process.env.PORT
app.use(express.static(__dirname + "/public"))
app.listen(port, () => console.log("App listening on "+port))


// Server
const ServerPort = 25565

const httpServer = http.createServer()
httpServer.listen(ServerPort, () => console.log("Server listening on "+ServerPort));

const wsServer = new websocketServer({
    "httpServer": httpServer
})

var clients = {}
var rooms = {}
var games = {}

wsServer.on("request", request => {
    // On connect
    const connection = request.accept(null, request.orgin)
    const client = new Client(connection, "none", guid(), "none")

    console.log("New connection")
    // console.log(client)

    clients[client.id] = client
    // console.log(clients)

    connection.on("open", () => console.log("opened"))
    connection.on("close", (req, res) => {
        console.log(`${client.name} (${client.id}) disconnected`)

        // console.log(clients)

        let room = rooms[client.room_id]
        if(room){
        room.broadcast("text", `${client.name} disconnected!`, [client.id])
        room.leave(client)
        }

        delete(clients[client.id])
    })
        // message handling
    connection.on("message", msg => {
        // console.log(msg)
        handleMessage(client, JSON.parse(msg.utf8Data))
    })

    send(connection, "connect", client.id)
})

// message handling
function handleMessage(client, msg){
    console.log(msg)
    const method = msg.method
    const data = msg.data

    if(method == "connect"){
    /*
    {
        method: "connect"
        data: {
        name: "example_name"
        room: "room_id"
        }
    */
    client.name = data.name
    client.room_id = data.room_id
    if (joinRoom(client, data.room_id)) {
        send(client.connection, "text", "The room you tried to join has already started.")
        send(client.connection, "eval", "menu.style.display = 'block'; lobby.style.display = 'none';")
    }
    // broadcast("text", `${client.name} connected`, client.id)
    // send(client.connection, "gameData", getGameData(client))
    // console.log(clients)
    send(client.connection, "yourid", client.id)
    return
    }
    if(method == "serverEval"){
    try{
        let result = eval(data)
        console.log(result)
        send(client.connection, "evalResult", result || "empty string")
    }catch(err){
        console.error("%cERROR","background:#f00;color:#000")
        console.error(err)
        send(client.connection, "evalResult", "Fatal error lol noob")
    }
    }

    if(method == "leave_room"){
    rooms[client.room_id].leave(client)
    // console.log(rooms)
    }
    if(method == "hit"){
        rooms[client.room_id].game.hit(client)
    }
    if(method == "stand"){
        rooms[client.room_id].game.stand(client)
    }
    if(method == "start_game"){
        rooms[client.room_id].start_game()
    }
}

function send(connection, method, data){
    const payLoad = {
    "method": method,
    "data": data
    }
    connection.send(JSON.stringify(payLoad))
}
function broadcast(method, data, senderId){
    for(key in clients){
    if(senderId == key)continue
    send(clients[key], method, data)
    }
}

function joinRoom(client, room_id){
    console.log(`%cTrying to join room %c${room_id}`,"color:#fa0", "color:#fff")

    if(!rooms[room_id]){
        console.log("created a new Room")
        room = new Room(room_id)
        rooms[room_id] = room
    }else{
        if(!rooms[room_id].game_active){
            console.log("joined existing room")
        }else{
            console.log("Room has already started!")
            return true
        }

    }
    rooms[room.id].join(client)
    console.log("%cJoined!","color:#5f5")
    // console.log(rooms[room_id])
    return false
}

function guid(){
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    return((S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase())
}

class Client{
    constructor(connection, name, id, room_id){
    this.connection = connection
    this.name = name
    this.id = id
    this.room_id = room_id
    this.admin = false
    this.stand = false
    }
}

class Room{
    constructor(id){
        this.game_active = false
        this.clients = {}
        this.id = id
        this.ids = Object.values(this.clients).map(client => client.id)
        this.game;
    // this.game = new Game(hintLength, roundTime (millis))
    }
    broadcast(method, data, ignore = []){
    for(let client_id in this.clients){
        if(ignore.includes(client_id))continue

        let client = this.clients[client_id]
        let connection = client.connection

        // console.log(client)

        console.log(`sending ${method} to %c${client.id}`, "color:#fff")
        try{
            send(connection, method, data)
            console.log(`%cSuccess!`, "color:#0f0") 
        }catch(err){
            console.error(err)
        }
    }
    }
    join(client){
        this.clients[client.id] = client
        client.room_id = this.id
        this.client_change()
    }
    leave(client){
        delete this.clients[client.id]
        if (Object.keys(this.clients).length == 0) {
            console.log(`Room: ${this.id} is empty and has will close!`)
            delete(rooms[this.id])
        }
        this.client_change()
    }
    client_change(){
        // if (Object.keys(this.clients).length > 0){
        //     Object.values(this.clients)[0].admin = true
        // }
        this.broadcast("player_change", this.getData())
    }
    getData() {
        let names = Object.values(this.clients).map(client => client.name)
        this.ids = Object.values(this.clients).map(client => client.id)
        let data = [names, this.ids]
        return data
    }
    start_game(){
        this.ids = Object.values(this.clients).map(client => client.id)
        let game = new Game(this.ids, this.id)
        games[this.id] = game 
        game.deal_cards()
        this.game_active = true
        this.game = game
    }
}

class Game{
    constructor(ids, room_id){
        this.playerids = ids
        this.players = {}
        this.room_id = room_id
        this.timeout = 30
        this.ongoing = false
        this.broadcast = ()=>{}
        this.rubixgrid = this.shuffle_colors()
        console.log(this.rubixgrid)
        rooms[this.room_id].broadcast("start_game", this.rubixgrid)
    }
    game_data(){
        let data = {
            "players": this.players
        }
        return data
    }


    game_result(){
        let data = {}
        let alltotals = Object.values(this.players).map(client => client.total)
        let diff = []
        for(let i in alltotals){
            diff.push(Math.abs(21-alltotals[i]))
        }
        data.players = this.players
        data.players.loser = []
        let p = diff.indexOf(Math.max(diff))
        for(let item of Object.keys(this.players)){
            console.log(item)
            console.log("Yes tihs djwekojdlwajdlkjalksdw----_daS-dW-aSDw")
            console.log(  data  )
            console.log(this.players[item].total)
            if (this.players[item].total == alltotals[p]){
                data.players.loser.push(item)
            }
        }
        
        return data 
    }
    shuffle_colors(){
        let colors = shuffle(repeat(["red", "blue", "yellow", "orange", "black", "white"], 4))
        return [colors[0],colors[1],colors[2],colors[3],colors[4],colors[5],colors[6],colors[7],colors[8]]
    }
}

function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}

function repeat(arr, n){
    var a = [];
    for (var i=0;i<n;[i++].push.apply(a,arr));
    return a;
  }