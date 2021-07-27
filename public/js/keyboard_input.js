let shift = false
var keyIndex = 0
document.addEventListener("keydown", event => {
    let key = event.key.toLocaleLowerCase()
    if (key == "shift"){
        shift = true
    }
    if ("wasd ".includes(key) && game_is_active){
        send("move", {
            "shift": shift,
            "key": key,
            "keyIndex": keyIndex 
        })
    }
})

document.addEventListener("keyup", event => {
    let key = event.key.toLocaleLowerCase()
    if (key == "shift"){
        shift = false
    }
})