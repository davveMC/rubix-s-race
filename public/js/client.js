let serverAdress = "localhost:25565"
var game_data;
var myid;
var score1 = 0
var score2 = 0
// serverAdress = "drawline.herokuapp.com"
const ws = new WebSocket("ws://" + serverAdress)
ws.onmessage = message => {
    const msg = JSON.parse(message.data);
    const method = msg.method
    const data = msg.data
    // console.log("recieved a message")
    // console.log(msg)
    switch (method) {
        case "grids":
            update_grids(data)
            break
        case "connect":
            console.log("Connected to server")
            break
        case "text":
            console.log(msg.data)
            break
        case "eval":
            eval(data)
            break
        case "player_change":
            addp(data)
            break
        case "start_game":
            lobby.style.display = "none"
            game.style.display = "block"
            game_is_active = true
            draw_grid(data)
            draw_grids()
            break
        case "game_data":
            game_data = data
            hand = game_data.players[myid].hand
            break
        case "yourid":
            myid = data
            break
        case "game_result":
            ding.play()
            delete_grids()
            console.log(data)
            if (data.winner == myid){
                score1 += 1
                getEl("score1").innerHTML = `Score: ${score1}`
                getEl("win-img").style = 'transform: translate(100%, 200px);'
            } else {
                score2 += 1
                getEl("score2").innerHTML = `Score: ${score2}`
                getEl("win-img").style = 'transform: translate(0, 200px);'
            }
            break
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