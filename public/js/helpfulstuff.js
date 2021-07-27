var game_is_active = false
const getEl = id => document.getElementById(id)

function addp(data) {
    let players = data[0]
    let player_id = data[1]
    let parent = getEl("smallerbox")
    while(parent.children[1]){
        parent.removeChild(parent.lastChild)
    }
    for (i in players) {
        console.log(players)
        plr = players[i]
        let player = document.createElement("div")
        player.innerHTML = plr
        player.id = plr
        parent.appendChild(player)

        // let image = document.createElement("input")
        // image.type = "image"
        // image.src = "./assets/kick.png"
        // image.onclick = () => send("kick", player_id[i]);
        // getEl(plr).appendChild(image)
    }
    getEl("name1").innerHTML = data[0][0]
    getEl("name2").innerHTML = data[0][1] || "Player Haven't Joined Yet"
}

function draw_grid(data){
    let parent = getEl("colorgrid")
    for(let i in data){
        let color = document.createElement("div")
        color.id = data[i]
        color.style = `background-color: ${data[i]}; border: 2px solid grey;`
        parent.appendChild(color)
    }
}

function draw_grids(){
    let colors = create_colors()
    for(let id_ of ["grid1", "grid2"]) {
        let parent = getEl(id_)
        console.log(colors, parent)
        for(let i in colors){
            let color = document.createElement("div")
            color.id = colors[i]
            color.style = `background-color: ${colors[i]}; border: 2px solid grey;`
            parent.appendChild(color)
        }
    }
}

function update_grids(data) {
    try{
        let HTMLgrids = [getEl("grid1"), getEl("grid2")]
        for(let i in HTMLgrids){
            let colors = data.players[i]["grid"]
            let grid = HTMLgrids[i]
            if (!colors) continue;
            for(let i in colors){
                grid.removeChild(grid.firstChild)
                let color = document.createElement("div")
                color.id = colors[i]
                color.style = `background-color: ${colors[i]}; border: 2px solid grey;`
                grid.appendChild(color)
            }
        }
    } catch(err){
    }

}

function delete_grids() {
    let grids = ["grid1", "grid2", "colorgrid"]
    for (let g of grids) {
        let grid = getEl(g)
        console.log(grid)
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
        }
    }
    // draw_grids()
}

function create_colors(){
    var colors = ["red", "blue", "yellow", "orange", "green"]
    let allcolors = []
    for(let color of colors){
        for(let i=0; i<4; i++) {
            if(color == "blue" && i == 0) {
                allcolors.push("empty")
            }
            else if(color != "red" && i == 0) {
                allcolors.push("white")
            }
            allcolors.push(color)
        }
    }
    allcolors.push("white")
    return allcolors
}