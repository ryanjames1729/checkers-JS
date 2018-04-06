let canvas = document.getElementById('ttt'),
    ctx = canvas.getContext('2d'),
    msg = document.getElementById('message'),
    mouse = {
      x: -1,
      y: -1,
    },
    cellSize = 50;
var huPlayer = "P",
    aiPlayer = "C",
    iter = 0,
    round = 0,
    currentPlayer = 1,
    gameOver = false;
canvas.width = canvas.height = 8*cellSize;
ctx.lineCap = "round";
var click = 0, firstClick = 0, secondClick = 0;

var board = [];
for(i = 1; i < 65; i++){
  board.push(i);
}

for(i = 0; i < 8; i+=2){
  board[i] = "C";
}
for(i = 9; i < 17; i+=2){
  board[i] = "C";
}
for(i = 16; i < 24; i+=2){
  board[i] = "C";
}

for(i = 41; i < 48; i+=2){
  board[i] = "P";
}
for(i = 48; i < 55; i+=2){
  board[i] = "P";
}
for(i = 57; i < 65; i+=2){
  board[i] = "P";
}

canvas.addEventListener('mouseout', function() {
  mouse.x = mouse.y = -1;
});

canvas.addEventListener('mousemove', function(e){
  let x = e.pageX - canvas.offsetLeft,
      y = e.pageY - canvas.offsetTop;

  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener('click', function(e) {
  x = Math.floor(mouse.x/50) + 1;
  y = Math.floor(mouse.y/50) + 1;
  console.log(x + ', ' + y + ': ' + (x+ (y-1)*8));
  if(currentPlayer == 1 && click == 0){
    firstClick = x + (y-1)*8;
    click = 1;
  }
  else if(currentPlayer == 1 && click == 1){
    secondClick = x + (y-1)*8;
    click = 0;
    play(firstClick-1, secondClick-1);
  }
});

function play(startLoc, endLoc) {
  if(board[endLoc] != "P" && board[endLoc] != "C" && (startLoc - endLoc == 7 || startLoc - endLoc == 9)){
    board[startLoc] = -1;
    board[endLoc] = "P";
    currentPlayer *= -1;
    draw();
    computerRandom();
  }
  if(board[endLoc] != "P" && board[endLoc] != "C" && board[(startLoc+endLoc)/2] == "C"){
    board[startLoc] = -1;
    board[(startLoc+endLoc)/2] = -1;
    board[endLoc] = "P";
    currentPlayer *= -1;
    draw();
    computerRandom();
  }
}

function computerRandom() {
  let validMove = false, computerPositions = [];
  for(i = 0; i < board.length; i++){
    if(board[i] == "C"){
      computerPositions.push(i+1);
    }
  }
  console.log(computerPositions.toString());
  while(!validMove){
    let newStartPos = computerPositions[Math.floor(Math.random()*computerPositions.length)] -1;
    console.log("computer startpos: " + newStartPos);
    let newEndPos = -1;
    let leftRight = Math.floor(Math.random()*2);
    if(leftRight == 1){
      newEndPos = newStartPos + 7;
      if(board[newEndPos] == "P"){
        newEndPos += 7;
      }
    }
    else{
      newEndPos = newStartPos + 9;
      if(board[newEndPos] == "P"){
        newEndPos += 9;
      }
    }
    if(newStartPos%8 == 0){
      newEndPos = newStartPos + 9;
      if(board[newEndPos] == "P"){
        newEndPos += 9;
      }
    }
    else if((newStartPos+1)% 8 == 0){
      newEndPos = newStartPos + 7;
      if(board[newEndPos] == "P"){
        newEndPos += 7;
      }
    }
    if(board[newEndPos] != "C" && board[newEndPos] != "P"){
      console.log("found valid move");
      console.log("computer endpos: " + newEndPos);
      board[newStartPos] = -1;
      board[newEndPos] = "C";
      if(board[(newEndPos + newStartPos)/2] == "P"){
        board[(newEndPos + newStartPos)/2] = -1;
      }
      currentPlayer *= -1;
      validMove = true;
      draw();
    }
  }
}

function draw () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBoard();
  fillBoard();

  function drawBoard() {
    ctx.fillStyle = 'gray';
    for(i = 1; i < 9; i+=2){
      for(j = 0; j < 8; j++){
        if(j%2 == 0){
          ctx.fillRect(i*cellSize,j*cellSize, cellSize, cellSize);
        }
        else{
          ctx.fillRect((i-1)*cellSize, j*cellSize, cellSize, cellSize);
        }
      }
    }
    ctx.fillStyle = 'white';
    for(i = 1; i < 9; i+=2){
      for(j = 0; j < 8; j++){
        if(j%2 != 0){
          ctx.fillRect(i*cellSize,j*cellSize, cellSize, cellSize);
        }
        else{
          ctx.fillRect((i-1)*cellSize, j*cellSize, cellSize, cellSize);
        }
      }
    }
  }

  function fillBoard() {
    console.log(board.toString());
    for(i = 0; i < 64; i++){
      if(board[i] == "C"){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        xPos = (i%8)*50 + 25;
        yPos = (Math.floor(i/8)*2 + 1)*25;
        //console.log(i + ' ' + xPos + ', ' + yPos);
        ctx.arc(xPos, yPos,25,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
      }
      if(board[i] == "P"){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        xPos = (i%8)*50 + 25;
        yPos = (Math.floor(i/8)*2 + 1)*25;
        //console.log(i + ' ' + xPos + ', ' + yPos);
        ctx.arc(xPos, yPos,25,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

draw();
