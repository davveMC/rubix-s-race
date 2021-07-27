function create_colors(){
    var colors = ["red", "blue", "yellow", "orange", "black"]
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