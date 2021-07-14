function calc_hand(){
    let total = 0
    for(let card of hand){
    card = card[0]
    if (Number(card)){
        total += Number(card)
    } else {
        switch(card){
        case "K":
            total += 10;
            break;
        case "Q":
            total += 10;
            break;
        case "J":
            total += 10;
            break;
        case "A":
            if (total <= 10) {
            total += 11  
            } else {
            total += 1
            }
        }
    }
    }
    hand_sum = total
    if (total > 21) {
        send("stand", "")
    }
}