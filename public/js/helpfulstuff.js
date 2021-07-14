var game_is_active = false
var hand;
var hand_sum;

const getEl = id => document.getElementById(id)
cards1 = [2,3,4,5,6,7,8,9,10,'A','J','Q','K']
cards = []
var loaded = false  
var images = {}
for(const card of cards1){
    cards.push(`${card}C`)
    cards.push(`${card}D`)
    cards.push(`${card}H`)
    cards.push(`${card}S`)
}

let cards2 = {}
let count = 0 
cards.forEach(card => {  // for each image url
    const image = new Image();
    image.src = `../assets/cards/${card}.png`;
    image.onload = ()=>{ 
        count += 1;
        if(count === cards1.length){ // have all loaded????
            images = cards2; // call function to start rendering
            loaded = true
        }
    }
    cards2[card] = image; // add loading image to images array
});

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
}