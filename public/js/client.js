let serverAdress = "83.254.146.244:25565"
var game_data;
var myid;
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
            delete_grids()
            console.log(data)
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