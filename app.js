//------------------------------------------------------------GAME CANVAS STARTERS

const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);

const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height); 
game.width = parseInt(width);

const ctx = game.getContext('2d');

//----------------------------------------------------------------EVENT LISTENERS

const playTheGame = document.querySelector('#status').addEventListener('click', function(){
    add(snakeP1);
})

//----------------------------------------------------------------SNAKE CREATOR
class SnakeFood {
    constructor (x, y, color, width, height, alive) {
        this.x = Math.floor(Math.random() * Math.floor(1000));
        this.y = Math.floor(Math.random() * Math.floor(600));
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = alive;
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height, this.alive)   
    }
}

class Snake {
    constructor(x, y, color, width, height, body) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.velX = 0;
        this.velY = 0;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)   
    }
}

const newFood = new SnakeFood(this.x, this.y, 'purple', 9, 9, true)

const snakeP1 = new Snake(100, 100, 'darkgreen', 10, 10);
const snakeP2 = new Snake(800, 100, 'darkred', 10, 10);


//---------------------------------------------------------------MOVEMENT FOR PLAYERS
//Player One
document.addEventListener('keyup', function(evt){
    if (evt.key === "w") {
        playerUp(snakeP1); 
    } else if (evt.key === "a") {
        playerLeft(snakeP1);  
    } else if (evt.key === "s") {
        playerDown(snakeP1);   
    } else if (evt.key === "d") {
        playerRight(snakeP1);
    }
})

//Player Two
document.addEventListener('keyup', function(evt){
    if (evt.key === "ArrowUp") {
        playerUp(snakeP2); 
    } else if (evt.key === "ArrowLeft") {
        playerLeft(snakeP2);  
    } else if (evt.key === "ArrowDown") {
        playerDown(snakeP2);    
    } else if (evt.key === "ArrowRight") {
        playerRight(snakeP2);
    }
})

//---------------------------------------------------------------------------FUNCTION


function playerUp(player){
    player.y -= 1;
    player.velX = 0;
    player.velY = -1;
}

function playerDown(player){
    player.y += 1;
    player.velX = 0;
    player.velY = 1; 
}

function playerLeft(player){
    player.x -= 1;
    player.velX = -1;
    player.velY = 0;  
}

function playerRight(player){
    player.x += 1;
    player.velX = 1;
    player.velY = 0; 
}

function foodEaten(){
    if (snakeP1.x < newFood.x + newFood.width
        && snakeP1.x + snakeP1.width > newFood.x
        && snakeP1.y < newFood.y + newFood.height
        && snakeP1.y + snakeP1.height > newFood.y) {
        newFood.alive = false;
        newFood.render();
        console.log('Food Eaten');
    }
    if (snakeP2.x < newFood.x + newFood.width
        && snakeP2.x + snakeP2.width > newFood.x
        && snakeP2.y < newFood.y + newFood.height
        && snakeP2.y + snakeP2.height > newFood.y) {
        newFood.alive = false;
        newFood.render();
        console.log('Food Eaten');
    }

}



function add(player) {
    player.width = player.width + 10;
}

function remove(){
    player.width = player.width - 10;
}


//---------------------------------------------------------------------------FRAMES FUNCTION
function frames(){
    ctx.clearRect(0, 0, game.width, game.height)
    snakeP1.render()
    snakeP2.render()
    foodEaten();
    if (newFood.alive){
        newFood.render()
    }
    
    snakeP1.x += snakeP1.velX;
    snakeP1.y += snakeP1.velY;

    snakeP2.x += snakeP2.velX;
    snakeP2.y += snakeP2.velY;   
}
let fps = 1000 / 60;
setInterval(frames, fps)
