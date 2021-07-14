let serverAdress = "83.254.146.244:25565"
var game_data;
var myid;
// serverAdress = "drawline.herokuapp.com"
const ws = new WebSocket("ws://" + serverAdress)
ws.onmessage = message => {
    const msg = JSON.parse(message.data);
    const method = msg.method
    const data = msg.data

    console.log(msg)
    if (method == "connect") {
        
    }
    if (method == "text") {
        console.log(msg.data)
    }
    if (method == "eval") {
        eval(data)
    }
    if (method == "player_change") {
        addp(data)
    }
    if (method == "start_game") {
        lobby.style.display = "none"
        game.style.display = "block"
    }
    if (method == "game_data") {
        game_data = data
        hand = game_data.players[myid].hand
        game_is_active = true
        calc_hand()
    }
    if (method == "yourid") {
        myid = data
    }
}

function send(method = "", data = "") {
    const payLoad = {
        "method": method,
        "data": data
    }
    if (ws.readyState == 1) {
        ws.send(JSON.stringify(payLoad))
    } else {
        console.log("disconnected from server!")
    }
}