//---------------------------------------------------------------------GAME CANVAS STARTERS
const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);
const ctx = game.getContext('2d');
const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height); 
game.width = parseInt(width);

const snd = new Audio("../Battle_Snakes/img/melodyloops-preview.mp3");
const bit = new Audio("../Battle_Snakes/img/Apple_Bite.mp3");
const ded = new Audio("../Battle_Snakes/img/womp-womp.mp3");

let score1 = 0;
let score2 = 0;
let fps = 120;
let snakeP1Array = [];
let snakeP2Array = [];

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
    random_x = Math.floor(Math.random() * (game.height - 15));
    random_y = Math.floor(Math.random() * (game.width - 15));  
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

//--------------------------------------------------------------------CALLING FOR SNAKE & FOOD
let apple = new Food(300, 300, 10, 10, 'red');

let snakeP1 = new Snake(100, 100, 'darkgreen', 20, 20);
snakeP1Array.push(snakeP1);
snakeP1 = snakeP1Array[0];

let snakeP2 = new Snake(400, 400, 'purple', 20, 20);
snakeP2Array.push(snakeP2);
snakeP2 = snakeP2Array[0];

//-------------------------------------------------------------------------MOVEMENT FOR PLAYERS
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

document.addEventListener('keyup', function(evt){
    if (evt.key === "ArrowUp") {
        playerUp(snakeP2Array); 
    } else if (evt.key === "ArrowLeft") {
        playerLeft(snakeP2Array);  
    } else if (evt.key === "ArrowDown") {
        playerDown(snakeP2Array);    
    } else if (evt.key === "ArrowRight") {
        playerRight(snakeP2Array);
    }
})
//--------------------------------------------------------------------------------FUNCTIONS

function playerUp(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === 0 && snakeBody.velY === 1) {
            return;
        } else {
            snakeBody.y -= 1;
            snakeBody.velX = 0;
            snakeBody.velY = -1;
        }
    }   

    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].y += 20;
    }
}

function playerDown(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === 0 && snakeBody.velY === -1) {
            return;
        } else {
            snakeBody.y -= 1;
            snakeBody.velX = 0;
            snakeBody.velY = 1;
        }
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].y -= 20;
    }   
} 

function playerLeft(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
       if (snakeBody.velX === 1 && snakeBody.velY === 0) {
        return;
        } else {
        snakeBody.x -= 1;
        snakeBody.velX = -1;
        snakeBody.velY = 0;
        }
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].x += 20;  
    }
}

function playerRight(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === -1 && snakeBody.velY === 0) {
            return;
        } else {
        snakeBody.x += 1;
        snakeBody.velX = 1;
        snakeBody.velY = 0;
        }    
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x; 
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].x -= 20;   
        }
}

function outOfBounds(player) {
    if (player.x + 30 > game.width ||
        player.x <= -1 ||
        player.y + 30  > game.height ||
        player.y <= -1) {
        const a = document.getElementById("lose");
        a.style.display = "block";
        snd.pause();
        ded.play();
        clearInterval(autoPlay);
    }
    if (snakeP1Array.length > 1) {
        for (let i = 1; i < snakeP1Array.length; i++) {
        const snakeHead = snakeP1Array[0];
        const snakeTail = snakeP1Array[i];
        if (snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y){
            const a = document.getElementById("lose");
            a.style.display = "block";
            a.textContent = 'PLAYER ONE TRIED TO EAT THEMSELVES'
            snd.pause();
            ded.play();
            clearInterval(autoPlay);
        } 
        }
    }
    if (snakeP2Array.length > 1) {
        for (let i = 1; i < snakeP2Array.length; i++) {
        const snakeHead = snakeP2Array[0];
        const snakeTail = snakeP2Array[i];
        if (snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y){
            console.log('LOSER');
            const a = document.getElementById("lose");
            a.style.display = "block";
            a.textContent = 'PLAYER TWO TRIED TO EAT THEMSELVES'
            snd.pause();
            ded.play();
        } 
        }
    }
}
    
function appleEaten(player) {
    if (player === snakeP1 && player.x + player.width > apple.x &&
        player.x < apple.x + apple.width &&
        player.y + player.height > apple.y &&
        player.y < apple.y + apple.height) { 
        score1++;
        apple.alive = false;
        bit.play();
        newApple(apple);
        addTailP1();
        apple = new Food(random_x, random_y, 10, 10, 'red');
    } else if (player === snakeP2 && player.x + player.width > apple.x &&
        player.x < apple.x + apple.width &&
        player.y + player.height > apple.y &&
        player.y < apple.y + apple.height) { 
        score2++;
        apple.alive = false;
        bit.play();
        newApple(apple);
        addTailP2();
        apple = new Food(random_x, random_y, 10, 10, 'red');
    }
}  

function addTailP1() {
    let snakeTail = snakeP1Array[snakeP1Array.length - 1];
    if (snakeP1.velX === 1){
        let snakeBody = new Snake(snakeTail.x-20, snakeTail.y, 'green', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP1Array.push(snakeBody);
    } else if (snakeP1.velX === -1){
        let snakeBody = new Snake(snakeTail.x + 20, snakeTail.y, 'green', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP1Array.push(snakeBody);
    } else if (snakeP1.velY === 1){
        let snakeBody = new Snake(snakeTail.x, snakeTail.y - 20, 'green', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP1Array.push(snakeBody);
    } else if (snakeP1.velY === -1){
        let snakeBody = new Snake(snakeTail.x, snakeTail.y  + 20, 'green', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP1Array.push(snakeBody);
    }

}

function addTailP2() {
    let snakeTail = snakeP2Array[snakeP2Array.length - 1];
    if (snakeP2.velX === 1){
        let snakeBody = new Snake(snakeTail.x-20, snakeTail.y, 'lavender', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP2Array.push(snakeBody);
    } else if (snakeP2.velX === -1){
        let snakeBody = new Snake(snakeTail.x + 20, snakeTail.y, 'lavender', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP2Array.push(snakeBody);
    } else if (snakeP2.velY === 1){
        let snakeBody = new Snake(snakeTail.x, snakeTail.y - 20, 'lavender', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP2Array.push(snakeBody);
    } else if (snakeP2.velY === -1){
        let snakeBody = new Snake(snakeTail.x, snakeTail.y  + 20, 'lavender', 20, 20);
        snakeBody.velX = snakeTail.velX;
        snakeBody.velY = snakeTail.velY;
        snakeP2Array.push(snakeBody);
    }

}

function playGame() {
    snd.play();
    const a = document.getElementById("container");
    a.style.display = "block";
    const b = document.getElementById("reset");
    b.style.display = "inline";
    const c = document.getElementById("play");
    c.style.display = "none";
    const d = document.getElementById("directions");
    d.style.display = "none";
    const e = document.getElementById("scoreTitle1");
    e.style.display = "inline";
    e.style.marginRight = "5px";
    const f = document.getElementById("scoreTitle2");
    f.style.display = "inline";
    f.style.marginLeft = "60px";
    const g = document.getElementById("score1");
    g.style.display = "inline";
    const h = document.getElementById("score2");
    h.style.display = "inline";
    const i = document.getElementById("logo");
    i.style.marginTop = "5px";
    i.style.marginBottom = "10px";
    i.style.width = "200px";

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

    for (let i = 0; i < snakeP2Array.length; i++) {
        let snakeBody = snakeP2Array[i];
        snakeBody.render();
        snakeBody.x += snakeBody.velX;
        snakeBody.y += snakeBody.velY;
    }
    
    document.getElementById('score1').textContent = " " + score1;
    document.getElementById('score2').textContent = " " + score2;
    
    snakeP1.render();
    outOfBounds(snakeP1)
    appleEaten(snakeP1);
    apple.render();
    snakeP2.render();
    outOfBounds(snakeP2)
    appleEaten(snakeP2);
}

const autoPlay = document.addEventListener('DOMContentLoaded', function(){
    setInterval(frames,1000 / fps)
});