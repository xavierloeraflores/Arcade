const up =[1,0]
const down = [-1,0]
const left = [0, -1]
const right = [0,1]

const game = document.getElementById('game')
const settings = document.getElementById('settings')



let snake = {
    body: [
        [10,5], [10,6], [10,7], [10,8], [10,9], [10,10]
    ],
    direction: up
}

let gameState = {
    rat: [7,7],
    snake:snake
}


// state
let initialState;

function buildInitialState() {


}

// render
function renderState() {
    console.log(gameState)
    game.innerText=gameState.snake.direction
    console.log(gameState.snake.body)
    // game.innerText+=" | " + gameState.snake.body
}

function ratCheck(){
    console.log("snake",gameState.snake.body[0], " length", gameState.snake.body.length)
     console.log("rat", gameState.rat)
    if (gameState.snake.body[0][0] == gameState.rat[0] && gameState.snake.body[0][1] == gameState.rat[1]){
        console.log("Eaten")
    }else{
        gameState.snake.body.pop()
    }
}


// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

function tick() {
    // this is an incremental change that happens to the state every time you update...
    gameState.snake.body.unshift(
        [
                gameState.snake.body[0][0]+gameState.snake.direction[0]
            ,
                gameState.snake.body[0][1]+gameState.snake.direction[1]
        ]
    )
    ratCheck()
    renderState();
  }
  
// setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible




//Changes Snake direction
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37 && gameState.snake.direction!=right) {
        gameState.snake.direction=left;
        tick()
    }
    else if (event.keyCode == 38 && gameState.snake.direction!=down) {
        gameState.snake.direction=up
        tick()
    }
    else if (event.keyCode == 39 && gameState.snake.direction!=left) {
        gameState.snake.direction=right
        tick()
    }
    else if (event.keyCode == 40 && gameState.snake.direction!=up) {
        gameState.snake.direction=down
        tick()
    }
    else if (event.key == 1) {
        console.log(gameState.snake.direction);
    }
});


console.log(gameState)