//------------------------------------------------------------GAME CANVAS STARTERS

const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);

const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height); 
game.width = parseInt(width);

const ctx = game.getContext('2d');


let snakeP1Array = [];

//----------------------------------------------------------------EVENT LISTENERS


//----------------------------------------------------------------SNAKE CREATOR

function Food (x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.total = 1;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function newApple() {
    random_x = Math.floor(Math.random() * (game.height - 15)); //need to take the height number
    random_y = Math.floor(Math.random() * (game.width - 15)); // need to take the width number   
}   

class Snake {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.velX = 0;
        this.velY = 0;
        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)   
        }
    }   
}


const snakeP1 = new Snake(100, 100, 'darkgreen', 30, 30);
snakeP1Array.push(snakeP1);
const snakeP2 = new Snake(400, 400, 'purple', 30, 30);


//---------------------------------------------------------------MOVEMENT FOR PLAYERS
//Player One
document.addEventListener('keyup', function(evt){
    if (evt.key === "w") {
        playerUp(snakeP1Array);
    } else if (evt.key === "a") {
        playerLeft(snakeP1Array);  
    } else if (evt.key === "s") {
        playerDown(snakeP1Array);   
    } else if (evt.key === "d") {
        playerRight(snakeP1Array);
    }
})

//Player Two
// document.addEventListener('keyup', function(evt){
//     if (evt.key === "ArrowUp") {
//         playerUp(snakeP2); 
//     } else if (evt.key === "ArrowLeft") {
//         playerLeft(snakeP2);  
//     } else if (evt.key === "ArrowDown") {
//         playerDown(snakeP2);    
//     } else if (evt.key === "ArrowRight") {
//         playerRight(snakeP2);
//     }
// })

//---------------------------------------------------------------------------FUNCTION


function playerUp(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        snakeBody.y -= 1;
        snakeBody.velX = 0;
        snakeBody.velY = -1;
        // snakeArray.pop(snakeArray.length[snakeP1Array.length - 1])
        // snakeArray.push(snakeBody);
    }
}

function playerDown(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        snakeBody.y += 1;
        snakeBody.velX = 0;
        snakeBody.velY = 1;
          
    }
    // player.y += 1;
    // player.velX = 0;
    // player.velY = 1; 
}

function playerLeft(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        snakeBody.x -= 1;
        snakeBody.velX = -1;
        snakeBody.velY = 0;
    }
    // player.x -= 1;
    // player.velX = -1;
    // player.velY = 0;  
}
function playerRight(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        snakeBody.x += 1;
        snakeBody.velX = 1;
        snakeBody.velY = 0;
    }
    // player.x += 1;
    // player.velX = 1;
    // player.velY = 0; 
}


function outOfBounds(player) {
    if (player.x > game.width) {
        player.x = 0;
    }
    if (player.x <= -1) {
        player.x = game.width;
    }
    if (player.y > game.height) {
        player.y = 0;
    }
    if (player.y <= -1) {
        player.y = game.height;
    }
}
function appleEaten() {
    if (snakeP1.x + snakeP1.width > apple.x &&
        snakeP1.x < apple.x + apple.width &&
        snakeP1.y + snakeP1.height > apple.y &&
        snakeP1.y < apple.y + apple.height ) { 
        
        apple.alive = false;
        addTail();
        newApple(apple);
        apple = new Food(random_x, random_y, 15, 15, 'white');
    }
}  

let apple = new Food(150, 100, 15, 15, 'red');


function addTail() {
    let snakeTail = snakeP1Array[snakeP1Array.length - 1];
    let snakeBody = new Snake(snakeTail.x-30, snakeTail.y, 'lightgreen', 30, 30);
    snakeBody.velX = snakeTail.velX;
    snakeBody.velY = snakeTail.velY;
    snakeP1Array.push(snakeBody);
}



function frames(){
    ctx.clearRect(0, 0, game.width, game.height)

    for (let i = 0; i < snakeP1Array.length; i++) {
        let snakeBody = snakeP1Array[i];
        // console.log(snakeBody);
        snakeBody.render();
        snakeBody.x += snakeBody.velX;
        snakeBody.y += snakeBody.velY;
    }
    

    // for (let i = (snakeP1Array.length - 1); i > 0; i--){ // i is always going to start at 0
    //     snakeP1Array[i].x = snakeP1Array[i - 1].x; //put its in different place in the array 
    //     snakeP1Array[i].y = snakeP1Array[i - 1].y; // minus    
     
    //   } 



    snakeP1.render();
    
    
    outOfBounds(snakeP1)
    apple.render();
    // snakeP1.x += snakeP1.velX;
    // snakeP1.y += snakeP1.velY;
    
    appleEaten();
    // Player Two
    // snakeP2.render()
    // outOfBounds(snakeP2)
    // snakeP2.x += snakeP2.velX;
    // snakeP2.y += snakeP2.velY;  
}

document.addEventListener('DOMContentLoaded', function(){
    let fps = 120;
    setInterval(frames,1000 / fps)
});