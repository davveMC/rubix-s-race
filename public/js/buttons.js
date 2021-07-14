lobby = getEl("lobby")
menu = getEl("main-menu")
game = getEl("game")
function start() {

    if (name_input.value == "Name") {
        name_input.value = `default_${Math.floor(Math.random()*10000)}`
    }
    if (room_input.value == "Room-ID") {
        room_input.value = "default"
    }

    send("connect", {
        name: name_input.value,
        room_id: room_input.value
    })
    menu.style.display = "none"
    lobby.style.display = "block"
    getEl("roomid").innerHTML = `Room-ID: ${room_input.value}`
    
    let player = document.createElement("div")
    player.innerHTML = "Hmm. Something went wrong!"
    getEl("smallerbox").appendChild(player)
    
}

function back() {
    menu.style.display = "block"
    lobby.style.display = "none"
    send("leave_room", room_input.value)
}

function startgame() {
    send("start_game", "")
}

function hit() {
    send('hit', 'null')
}

function stand() {
    send('stand', 'null')
}