const up =[-1,0]
const down = [1,0]
const left = [0, -1]
const right = [0,1]

const game = document.getElementById('game')
const settings = document.getElementById('settings')
const table = document.getElementById('board');

let snake = {
    body: [
    ],
    direction: up
}

let gameState = {
    rat: [100,100],
    snake:snake,
    playing:false
}

function makeRow(){
    const row = document.createElement('tr');
    for (let i = 0; i < 20; i++){
        const td = document.createElement('td');
        row.appendChild(td);
    }
    table.appendChild(row);
}

function buildBoard() {
    for ( let i =0; i<20; i++){
        makeRow()
    }
}

function clearGame() {
        for (let i=0; i<table.children.length; i++){
            for (let j =0; j<table.children.item(i).children.length;j++){
                table.children.item(i).children.item(j).className=''
            }
        }
        snake = {
            body: [
            ],
            direction: up
        }
        
        gameState = {
            rat: [100,100],
            snake:snake,
            playing:false
        }
        renderState()
}

// render
function renderState() {
    snake.body.forEach((element, idx) => {
        let x=element[0]
        let y=element[1]
        if(idx%2===1)table.children.item(x).children.item(y).className='red'
        if(idx%2===0)table.children.item(x).children.item(y).className='blue'
        if(idx==0)table.children.item(x).children.item(y).className='yellow'
        // if((snake.body.length-idx)<2)table.children.item(x).children.item(y).className='yellow'
    });
    table.children.item(gameState.rat[0]).children.item(gameState.rat[1]).className='green'

}

function ratCheck(){
    if (gameState.snake.body[0][0] == gameState.rat[0] && gameState.snake.body[0][1] == gameState.rat[1]){
        gameState.rat[0]= Math.floor(Math.random() * 20)
        gameState.rat[1]= Math.floor(Math.random() * 20)
    }else{
        let empty = gameState.snake.body.pop()
        table.children.item(empty[0]).children.item(empty[1]).className=''
    }
}
function bodyCheck(){
    for(let i=1; i<snake.body.length; i++){
        let x=snake.body[i][0]
        let y=snake.body[i][1]
        if (gameState.snake.body[0][0] == x && gameState.snake.body[0][1] == y){
            clearGame()
        }
    }
}
function borderCheck() {
    if (gameState.snake.body[0][0] > 19 || gameState.snake.body[0][0] < 0 || gameState.snake.body[0][1] >19 || gameState.snake.body[0][1] <0){
        clearGame()
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
        snake:snake,
        playing:true
    }
  renderState() // show the user the new state
}

function tick() {
    if (gameState.playing){
        gameState.snake.body.unshift(
            [gameState.snake.body[0][0]+gameState.snake.direction[0],
            gameState.snake.body[0][1]+gameState.snake.direction[1]]
            )
            bodyCheck()
            borderCheck()
            ratCheck()
    }
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
        gameState.playing=false
    }
    else if (event.key == 2) {
        gameState.playing=true
    }
    else if (event.key == 3) {
        clearGame()
    }
});

buildBoard()
start = document.getElementById('start')
start.addEventListener('click',gameStart)
setInterval(tick, 150)