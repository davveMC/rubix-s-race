var game_is_active = false
const getEl = id => document.getElementById(id)
var loaded = false  
var images = {}


function addp(data) {
    let players = data[0]
    let player_id = data[1]
    let parent = getEl("smallerbox")
    var button = parent.children[0]
    while(parent.children[0]){
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
    parent.append(button)
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
    for(let id_ of ["yourgrid", "theirgrid"]) {
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
    let HTMLgrids = [getEl("yourgrid"), getEl("theirgrid")]
    for(let i in HTMLgrids){
        let colors = data.players[i].grid
        let grid = HTMLgrids[i]
        if (!colors) continue;
        for(let i in colors){
            grid.removeChild(grid.children[0])
            let color = document.createElement("div")
            color.id = colors[i]
            color.style = `background-color: ${colors[i]}; border: 2px solid grey;`
            grid.appendChild(color)
        }
    }
}

function delete_grids() {
    let grids = ["yourgrid", "theirgrid", "colorgrid"]
    for (let g of grids) {
        grid = getEl(g)
        console.log(grid)
        while (grid.lastChild) {
            grid.removeChild(grid.children[0])
        }
    }
}