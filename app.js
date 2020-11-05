const gameScreen = document.getElementById('snake');
const ctx = gameScreen.getContext('2d');

//This sets the unit
let unit = 32;

//This code is to load the images
const grass = new Image();
grass.src = 'img/grass.png';

const apple = new Image();
apple.src = 'img/apple.png';

// Player 1 and Player 2 Snakes
let snake1 = [];
    snake1[0] = {
        x: 10*unit,
        y: 10*unit
    }

// let snake2 = [];
//     snake2[0] = {
//         x: 16*unit,
//         y: 16*unit
//     }

// Random spawn for food Food
let food = {
    x: Math.floor(Math.random()*17+1) * unit,
    y: Math.floor(Math.random()*15+3) * unit
}

    
function refreshRate(){

    ctx.drawImage(grass, 0, 0);

for( let i = 0; i < snake1.length ; i++){
    ctx.fillStyle = ( i == 0 )? 'purple' : 'white';
    ctx.fillRect(snake1[i].x,snake1[i].y,unit, unit);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake1[i].x,snake1[i].y,unit, unit);
    }

// for (let i =0; i <snake2.length;i++) {
//     ctx.fillStyle = (i==0)? 'blue' : 'white';
//     ctx.fillRect(snake2[i].x,snake2[i].y,unit, unit);

//     ctx.strokeStyle = 'orange';
//     ctx.strokeRect(snake2[i].x,snake2[i].y,unit, unit);
//     }

ctx.drawImage(apple, food.x, food.y );

let snake1X = snake1[0].x;
let snake1Y = snake1[0].y;

snake1.pop();

document.addEventListener('keydown', direction);

function direction(event){
        if (event.key === "w") {
            snake1Y -= unit;
        } else if (event.key === 's') {
            d = 'down';
        } else if (event.key === 'a') {
            d = 'left';
        } else if (event.key === 'd') {
            d = "right"
        }
}

let newHead = {
    x : snake1X,
    y : snake1Y
}
snake1.unshift(newHead);

}


let game = setInterval(refreshRate, 100)