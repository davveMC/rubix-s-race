var name_input = getEl("name")
var room_input = getEl("room-id")
name_input.addEventListener("focus", (event) => {
    if (name_input.value == "Name") {
        name_input.value = ""
    }
})
name_input.addEventListener("focusout", (event) => {
    if (name_input.value == "") {
        name_input.value = "Name"
    }
})

room_input.addEventListener("focus", (event) => {
    if (room_input.value == "Room-ID") {
        room_input.value = ""
    }
})
room_input.addEventListener("focusout", (event) => {
    if (room_input.value == "") {
        room_input.value = "Room-ID"
    }
})



// name_input = getEl("name")
// name_input.addEventListener("mouseover", (event) => {
//     if (name_input.value == "Name") {
//         name_input.value = ""
//     }
// })
// name_input.addEventListener("mouseout", (event) => {
//     if (name_input.value == "") {
//         name_input.value = "Name"
//     }
// })

// room_input = getEl("room")
// room_input.addEventListener("mouseover", (event) => {
//     if (room_input.value == "Room-ID") {
//         room_input.value = ""
//     }
// })
// room_input.addEventListener("mouseout", (event) => {
//     if (room_input.value == "") {
//         room_input.value = "Room-ID"
//     }
// })