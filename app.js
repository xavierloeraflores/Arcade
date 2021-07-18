const up =[-1,0]
const down = [1,0]
const left = [0, -1]
const right = [0,1]

const game = document.getElementById('game')
const settings = document.getElementById('settings')
const table = document.getElementById('board');

let snake = {
    body: [
        [10,5], [10,6], [10,7], [10,8], [10,9], [10,10]
    ],
    direction: up
}

let gameState = {
    rat: [7,7],
    snake:snake,
}

function makeRow(){
    const row = document.createElement('tr');
    for (let i = 0; i < 20; i++){
        const td = document.createElement('td');
        row.appendChild(td);
    }
    table.appendChild(row);
}



function buildInitialState() {
    for ( let i =0; i<20; i++){
        makeRow()
    }

}

// render
function renderState() {
    console.log(gameState)
    console.log(gameState.snake.body)
    snake.body.forEach(element => {
        let x=element[0]
        let y=element[1]
        table.children.item(x).children.item(y).className='red'
    });
    table.children.item(gameState.rat[0]).children.item(gameState.rat[1]).className='green'

}

function ratCheck(){
    if (gameState.snake.body[0][0] == gameState.rat[0] && gameState.snake.body[0][1] == gameState.rat[1]){
        console.log("Eaten")
        gameState.rat[0]= Math.floor(Math.random() * 20)
        gameState.rat[1]= Math.floor(Math.random() * 20)
    }else{
        let empty = gameState.snake.body.pop()
        table.children.item(empty[0]).children.item(empty[1]).className=''
    }
}



function gameStart() {
    snake = {
        body: [
            [10,5], [10,6], [10,7], [10,8], [10,9], [10,10]
        ],
        direction: up
    }

    gameState = {
        rat: [7,7],
        snake:snake
    }
  renderState() // show the user the new state
  setInterval(tick, 50)
}

function tick() {
    // this is an incremental change that happens to the state every time you update...
    gameState.snake.body.unshift(
        [gameState.snake.body[0][0]+gameState.snake.direction[0],
        gameState.snake.body[0][1]+gameState.snake.direction[1]]
    )
    ratCheck()
    renderState();
  }



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

buildInitialState()
start = document.getElementById('start')
start.addEventListener('click',gameStart)