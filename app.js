//------------------------------------------------------------GAME CANVAS STARTERS
const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);
const ctx = game.getContext('2d');
const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height); 
game.width = parseInt(width);


let score = 0;
let fps = 120;
let snakeP1Array = [];

//----------------------------------------------------------------SNAKE & FOOD CONSTRUCTORS

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

//----------------------------------------------------------------CALLING FOR SNAKE & FOOD
let apple = new Food(150, 100, 10, 10, 'red');
const snakeP1 = new Snake(100, 100, 'darkgreen', 20, 20);
snakeP1Array.push(snakeP1);



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

//---------------------------------------------------------------------------FUNCTIONS

function playerUp(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === 0 && snakeBody.velY === 1) {
            return;
        } else
        snakeBody.y -= 1;
        snakeBody.velX = 0;
        snakeBody.velY = -1;
    }
}

function playerDown(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === 0 && snakeBody.velY === -1) {
            return;
        } else
        snakeBody.y += 1;
        snakeBody.velX = 0;
        snakeBody.velY = 1;
    }
    
}

function playerLeft(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
    if (snakeBody.velX === 1 && snakeBody.velY === 0) {
        return;
    } else
        snakeBody.x -= 1;
        snakeBody.velX = -1;
        snakeBody.velY = 0;
    }
}

function playerRight(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === -1 && snakeBody.velY === 0) {
            return;
        } else
        snakeBody.x += 1;
        snakeBody.velX = 1;
        snakeBody.velY = 0;
    }
}

function outOfBounds(player) {
    if (player.x + 30 > game.width ||
        player.x <= -1 ||
        player.y + 30  > game.height ||
        player.y <= -1) {
        const a = document.getElementById("lose");
        a.style.display = "block";
        clearInterval(frames());
    } 
}
    
function appleEaten() {
    if (snakeP1.x + snakeP1.width > apple.x &&
        snakeP1.x < apple.x + apple.width &&
        snakeP1.y + snakeP1.height > apple.y &&
        snakeP1.y < apple.y + apple.height ) { 
        score++;
        apple.alive = false;
        addTail();
        newApple(apple);
        apple = new Food(random_x, random_y, 10, 10, 'red');
    }
}  

function addTail() {
    let snakeTail = snakeP1Array[snakeP1Array.length - 1];
    let snakeBody = new Snake(snakeTail.x-20, snakeTail.y, 'lightgreen', 20, 20);
    snakeBody.velX = snakeTail.velX;
    snakeBody.velY = snakeTail.velY;
    snakeP1Array.push(snakeBody);
}

function playGame() {
    const a = document.getElementById("container");
    a.style.display = "block";
    const b = document.getElementById("reset");
    b.style.display = "inline";
    const c = document.getElementById("play");
    c.style.display = "none";
    const d = document.getElementById("directions");
    d.style.display = "none";
    const e = document.getElementById("scoreTitle");
    e.style.display = "inline";
    const f = document.getElementById("score");
    f.style.display = "inline";
    const g = document.getElementById("logo");
    g.style.marginTop = "5px";
    g.style.marginBottom = "15px";
    g.style.width = "200px";

}

function resetGame() {
    window.location.reload();
}

function frames(){
    ctx.clearRect(0, 0, game.width, game.height)

    for (let i = 0; i < snakeP1Array.length; i++) {
        let snakeBody = snakeP1Array[i];
        snakeBody.render();
        snakeBody.x += snakeBody.velX;
        snakeBody.y += snakeBody.velY;
    }
    
    document.getElementById('score').textContent = " " + score;
    
    snakeP1.render();
    outOfBounds(snakeP1)
    apple.render();
    appleEaten();
    

}

document.addEventListener('DOMContentLoaded', function(){
    setInterval(frames,1000 / fps)
});








//UNUSED
//Player Two
// const snakeP2 = new Snake(400, 400, 'purple', 30, 30);
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

// Player Two
// snakeP2.render()
// outOfBounds(snakeP2) 