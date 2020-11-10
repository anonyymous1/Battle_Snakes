# Battle Snakes!
Project One: Creating my game!

![Preview1](https://i.imgur.com/G0x7dUS.png)

![Preview2](https://i.imgur.com/tCRNtqM.png)

# Table of Contents

1. [About](#About)
2. [Challenges](#Challenges)
3. [Functions](#Functions)
4. [Code](#Peak)
5. [Future Updates](#Things)

## About Battle Snakes & How to play

I wanted to challenge myself a little and have fun styling it so i ended up making a Snake game where I make improvements in the future. Using the W, A, S, D keys you can move the snake Up, Down, Left and Right. Try to collect as many items as you can but be careful not to hit the walls or yourself. 


## Challenges that came my way.

Styling the game was fun. Coding on the other hand wrecked my brains. The movemnt of the snake came easy and random functions to spawn the items came quick. The issues I had mainly revolved around the movement of the snakesbody and body functions. I definitely help to talk it out with others and work through the problem.

### Functions
| Functions | Description |
| ----------- | ----------- |
| `playerDirections()` | Moves the players Up, Down, Left, Right. |
| `outOfBounds()` | Sets the conditions for when the players lose. |
| `appleEaten()` | When player meets item spawns randoms item again and plays sound. |
| `addTail()` | Function adds an extra tail on the end, and score goals up. |
| `playGame()` | Starts the game. |
| `resetGame()` | Resets the game. |

## Peak at my Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Battle Snakes</title>
</head>
<body>
    <div class="instruct">
        <img src="https://i.imgur.com/dDYPrTZ.png" alt="logo" id="logo"><br>
        <h4 id="lose">YOU DIED!</h4>
        <h1 id='scoreTitle'>Score: </h1><h1 id="score"></h1>
        <div id="directions">
            <h4>INSTRUCTIONS</h4>
            <h5>
                YOU MUST KEEP HITTING THE KEYS TO CONTINUTE TO MOVE THE SNAKE.<br><br>
                Use W (Up), A (Left), S (Down), D (Right) to control your snake.<br>
                Eat as many apples as you can before you die.<br>
                Start the game by simple moving in a direction
            </h5>
        </div>
        <button type="button" class="btn btn-danger" id="play" onclick="playGame()">Play Game</button>
    </div>
    <div id="container">
        <canvas id="game" width="500" height="500"><canvas>
      </div>
      <div class="button">
        <button type="button" class="btn btn-danger" id="reset" onclick="resetGame()">Reset Game</button>
      </div>
      <div id="dummy">
      </div>

      <footer>
          Ruben Cedeno - Snake Project 2020
        </footer>
    <script src="app.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>
```

```css
@import url('https://fonts.googleapis.com/css2?family=Teko&display=swap');

body {
  text-align: center;
  background-color: rgb(43, 43, 43);
  background-image: url('https://i.imgur.com/cKGGRUo.jpg');
  background-size: cover;
  font-family: 'Teko', sans-serif;
}

#game {
  margin-top: 40px;
  position: relative;
  align-self: center;
  background-image: url('https://i.imgur.com/8RLB7Ck.png');
  background-size: 350px;
  width: 500px;
  height: 500px;
  border: 3px black solid;
  border-radius: 10px;
}

h4, h5 {
  font-family: 'Teko', sans-serif;
  margin-bottom: 0px;
  margin-top: 0px;
  color: whitesmoke;
}

h4 {
  font-size: 30px;
}

h5 {
  font-size: 15px;
}

img {
  width: 400px;
  margin-top: 180px;
  margin-bottom: 20px;
}

#container, #reset, #scoreTitle, #score, #lose{
  display: none;
}

#lose {
  position: absolute;
  justify-content: center;
  font-size: 40px;
  color: red;
  bottom: 50%;
  z-index: 1;
  width: 100%;
}

#play {
  margin-top: 30px;
}

#reset {
  margin-top: 20px;
}

#scoreTitle, #score {
  color: whitesmoke;
  
}

.directions {
  display: inline;
}

footer {
  position: fixed;
  color: lightgrey;
  left: 0;
  bottom: 0;
  width: 100%;
}
```

```javascript
function playerUp(snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeBody = snakeArray[i];
        if (snakeBody.velX === 0 && snakeBody.velY === 1) {
            return;
        } else {
            snakeBody.y -= 1;
            snakeBody.velX = 0;
            snakeBody.velY = -1;
            // console.log("Player Up");
        }
    }   

    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].y += 20;            
        // console.log("-------Up---------");
        // console.log(`[${i}]:x ${snakeArray[i].x}`);
        // console.log(`[${i}]:y ${snakeArray[i].y}`);
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
            // console.log("Player Down");
        }
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].y -= 20;
        // console.log("-------Down---------");
        // console.log(`[${i}]:x ${snakeArray[i].x}`);
        // console.log(`[${i}]:y ${snakeArray[i].y}`);
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
        // console.log("Player Left");
        }
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].x += 20;
        // console.log("-------Left---------");
        // console.log(`[${i}]:x ${snakeArray[i].x}`);
        // console.log(`[${i}]:y ${snakeArray[i].y}`);     
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
        // console.log("Player Right");
        }    
    }
    
    for (let i = (snakeArray.length - 1); i > 0; i--) {
        snakeArray[i].x = snakeArray[i - 1].x; 
        snakeArray[i].y = snakeArray[i - 1].y;
        snakeArray[i].x -= 20; 
        // console.log("-------Right---------");
        // console.log(`[${i}]:x ${snakeArray[i].x}`);
        // console.log(`[${i}]:y ${snakeArray[i].y}`);    
        }
}
```

### Things I want to add in the future

My goal is to get the game at least working for one player. But in the future i plan on adding the following:
- Add second player to make the Games Battle Snakes.
- Give player choice of choosing color of snake.
- Random items that have other effects like double growth or extra speed.
- Increase speed with each item eaten.
- Implement obstacles that are either fixed on the stage or moving so you can dodge.
- Ability to change the wallpaper in the home function.
- Better graphics for the snake or use images 
