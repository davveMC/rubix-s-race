"use strict";

// Declare as variable
let canvas;
let context;
let secondsPassed;
let oldTimeStamp;
let fps;
let width;
let height;
let cards;
// Listen to the onLoad event
window.onload = init;

// Trigger init function when the page has loaded
function init() {
    canvas = getEl('canvas');
    context = canvas.getContext('2d');
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    width = context.canvas.width
    height = context.canvas.height
    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    // Draw number to the screen
    context.clearRect(10, 30, 2000, 600);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
    // Perform the drawing operation
    draw();
    // The loop function has reached it's end
    // Keep requesting new frames
    requestAnimationFrame(gameLoop);
}

function draw() {
    if (loaded && game_is_active) {
        for(let i in hand) {
            let x = 0
            let y = 0
            let img = images[hand[i]]
            let img_size = 100
            let img_size_height = img_size * (img.height/img.width)
            let img_size_width = img_size
            // Scale
            x = ( (+i+1) / (hand.length+1) ) * width - (img_size/2)
            y = height*0.7
                context.drawImage(img, x, y, img_size_width, img_size_height)
        }
        let totalElement = getEl("total")
        totalElement.innerHTML = `Total: ${hand_sum}`
    }
}

window.addEventListener("resize", event => {     
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    width = window.innerWidth;
    height = window.innerHeight;
})