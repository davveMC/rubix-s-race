let shift = false
document.addEventListener("keydown", event => {
    let key = event.key.toLocaleLowerCase()
    if (key == "shift"){
        shift = true
    }
    if ("wasd ".includes(key) && game_is_active){
        send("move", {
            "shift": shift,
            "key": key
        })
    }
})

document.addEventListener("keyup", event => {
    let key = event.key.toLocaleLowerCase()
    if (key == "shift"){
        shift = false
    }
})