///////////////
//      Defining Global Variables
//////////////
const up =[-1,0]
const down = [1,0]
const left = [0, -1]
const right = [0,1]

let snake = {
    body: [
    ],
    direction: up
}

let gameState = {
    rat: [100,100],
    snake:snake,
    playing:false,
    score:0
}
///////////////
//      HTML Elements
//////////////
const game = document.getElementById('game')
const settings = document.getElementById('settings')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const table = document.getElementById('board');
const score = document.getElementById('score')

///////////////
//      Table Creation
//////////////

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
    stop.style.display= 'none'
    start.style.display= 'block'
}

///////////////
//      Game Functions
//////////////
function renderState() {
    //Renders the state of every element on the board
    score.innerText=gameState.score
    //Renders snake colors
    snake.body.forEach((element, idx) => {
        let x=element[0]
        let y=element[1]
        if(idx%2===1)table.children.item(x).children.item(y).className='red'
        if(idx%2===0)table.children.item(x).children.item(y).className='blue'
        if(idx==0)table.children.item(x).children.item(y).className='yellow'
    });
    //Renders Rat
    let ratX = gameState.rat[0]
    let ratY = gameState.rat[1]
    table.children.item(ratX).children.item(ratY).className='green'
}

function clearGame() {
    //Clears the Game board
    for (let i=0; i<table.children.length; i++){
        for (let j =0; j<table.children.item(i).children.length;j++){
            table.children.item(i).children.item(j).className=''
        }
    }
    //Empties Snake
    snake = {
        body: [
        ],
        direction: up
    }
    //Removes rat and stops the playing snake logic
    gameState = {
        rat: [100,100],
        snake:snake,
        playing:false,
        score:gameState.score//Sets the score to previous game score
    }
    stop.style.display= 'none'
    start.style.display= 'block'
    renderState()//Renders empty board
}

function gameStart() {
    //Sets initial snake
    snake = {
        body: [
            [10,5], [10,6], [10,7], [10,8], [10,9], [10,10]
        ],
        direction: up
    }
    //Places rate & sets playing to true
    gameState = {
        rat: [7,7],
        snake:snake,
        playing:true,
        score:0
    }
    start.style.display= 'none'
    stop.style.display= 'block'
}

function tick() {
    if (gameState.playing){
        //Adds new head to snake body 


        gameState.snake.body.unshift(
            [gameState.snake.body[0][0]+gameState.snake.direction[0],
            gameState.snake.body[0][1]+gameState.snake.direction[1]]
            )
        if(bodyCheck()){//Checks if snake eats itself
            if(borderCheck()){//Checks if snake runs into the border
                ratCheck()//Rat logic & Snake Tail is removed here 
                renderState()
            }//Checks if snake runs into the border
        }
    }

}


///////////////
//      Snake Collision Logic Functions
//////////////
function ratCheck(){
    //Checks to see if the head has eaten the rat & if so-> creates new rat
    if (gameState.snake.body[0][0] == gameState.rat[0] && gameState.snake.body[0][1] == gameState.rat[1]){
        gameState.rat[0]= Math.floor(Math.random() * 20)
        gameState.rat[1]= Math.floor(Math.random() * 20)
        gameState.score+=1
    }else{
        //Otherwise, just move the snake
        let empty = gameState.snake.body.pop()
        table.children.item(empty[0]).children.item(empty[1]).className=''
    }
}
function bodyCheck(){
    //Checks to see if the head has collided with the body & ends game
    for(let i=1; i<snake.body.length; i++){
        let x=snake.body[i][0]
        let y=snake.body[i][1]
        if (gameState.snake.body[0][0] == x && gameState.snake.body[0][1] == y){
            clearGame()
            return false
        }
    }
    return true
}
function borderCheck() {
    //checks to see if the head has collided with game border & ends game
    if (gameState.snake.body[0][0] > 19 || gameState.snake.body[0][0] < 0 || gameState.snake.body[0][1] >19 || gameState.snake.body[0][1] <0){
        clearGame()
        return false
    }
    return true
}


///////////////
//      Keyboard Bindings
//////////////
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37 && gameState.snake.direction!=right) {
        gameState.snake.direction=left;
        tick()//Snake Slithers Faster with button presses
    }
    else if (event.keyCode == 38 && gameState.snake.direction!=down) {
        gameState.snake.direction=up
        tick()//Snake Slithers Faster with button presses
    }
    else if (event.keyCode == 39 && gameState.snake.direction!=left) {
        gameState.snake.direction=right
        tick()//Snake Slithers Faster with button presses
    }
    else if (event.keyCode == 40 && gameState.snake.direction!=up) {
        gameState.snake.direction=down
        tick()//Snake Slithers Faster with button presses
    }
    else if (event.key == 1) {
        gameState.playing=false//not so hidden Pause Feature
    }
    else if (event.key == 2) {
        gameState.playing=true//not so hidden Resume Feature 
    }
    else if (event.key == 3) {
        clearGame()//Stop Game Keyboard Shortcut
    }
    else if (event.key == 4) {
        gameStart()//Start Game Keyboard Shortcut
    }
    
});


///////////////
//      Main
//////////////
buildBoard()
start.addEventListener('click',gameStart)
stop.addEventListener('click', clearGame)
setInterval(tick, 100)