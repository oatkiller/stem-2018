const playerOne = {
  xVelocity: 0,
  yVelocity: -1,
  x: 20,
  y: 30,
  fillStyle: 'red',
  name: 'one',
}

const playerTwo = {
  xVelocity: 0,
  yVelocity: 1,
  x: 40,
  y: 30,
  fillStyle: 'blue',
  name: 'two',
}

const wall = {
  fillStyle: 'black',
}

const tileSize = 10
const gridWidth = 60
const gridHeight = 60

// Empty board
const board = []

// initialize board and add walls
for (let x = 0; x < gridWidth; x++) {

  // create a row
  board[x] = []
  board[x].length = gridHeight

  for (let y = 0; y < gridHeight; y++) {
    // Add walls to the edges
    if (x === 0 || x === gridWidth - 1 || y === 0 || y === gridHeight - 1) {
      board[x][y] = wall
    }
  }
}

// place the players
board[playerOne.x][playerOne.y] = playerOne
board[playerTwo.x][playerTwo.y] = playerTwo

function render() {
  const canvas = document.getElementById('game')
  canvas.width = gridWidth * tileSize
  canvas.height = gridHeight * tileSize
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      const item = board[x][y]
      if (item) {
        context.fillStyle = item.fillStyle
        context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }
}


let turn = 0
const tick = setInterval(
  function() {
    turn = turn + 1
    if (turn % 2 === 0) {
      movePlayer(playerOne)
    } else {
      movePlayer(playerTwo)
    }
    render()

    function movePlayer(player) {
      player.x += player.xVelocity
      player.y += player.yVelocity
      if (board[player.x][player.y]) {
        alert(player.name + ' loses')
        clearInterval(tick);
      }
      board[player.x][player.y] = player
    }
  },
  1000 / 30,
)

window.addEventListener(
  'keydown',
  function(event) {
    if (event.key === 'w') {
      playerOne.xVelocity = 0
      playerOne.yVelocity = -1
    } else if (event.key === 'd') {
      playerOne.xVelocity = 1
      playerOne.yVelocity = 0
    } else if (event.key === 's') {
      playerOne.xVelocity = 0
      playerOne.yVelocity = 1
    } else if (event.key === 'a') {
      playerOne.xVelocity = -1
      playerOne.yVelocity = 0
    } else if (event.key === 'ArrowUp') {
      playerTwo.xVelocity = 0
      playerTwo.yVelocity = -1
    } else if (event.key === 'ArrowRight') {
      playerTwo.xVelocity = 1
      playerTwo.yVelocity = 0
    } else if (event.key === 'ArrowDown') {
      playerTwo.xVelocity = 0
      playerTwo.yVelocity = 1
    } else if (event.key === 'ArrowLeft') {
      playerTwo.xVelocity = -1
      playerTwo.yVelocity = 0
    }
    console.log(playerOne, playerTwo)
  },
  false
)
