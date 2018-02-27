// How long to wait between procesing a turn (in milliseconds)
const gameSpeed = 5000

// Width / height of a tile in pixels
const tileSize = 10

// The width and height of the movable area
const gridWidth = 60
const gridHeight = 60

// represents player two in the board data
const playerOne = {
  // starting direction
  direction: 'down',

  // starting position
  x: 20,
  y: 30,

  // snake color
  fillStyle: 'red',

  // used in winning message
  name: 'Red',
}

// represents player two in the board data
const playerTwo = {
  // starting direction
  direction: 'up',

  // starting position
  x: 40,
  y: 30,

  // snake color
  fillStyle: 'blue',

  // used in winning message
  name: 'Blue',
}

// represents a wall in the board data
const wall = {
  fillStyle: 'black',
}

// Empty board
const board = initializedBoard()

// The players take turns moving, that way there can never be a tie
// The turn counter determines which player is moving
// playerOne plays on odd turn numbers
// playerTwo plays on even turn numbers
let turn = 0

// Add an event listener that will call a function when players press any key
window.addEventListener(
  'keydown',
  handleKeydownEvent,
  false
)

// Run `gameSpeed` on an interval, moving the snakes and determining if there is a loser
const tickInterval = setInterval(
  tick,
  gameSpeed
)

requestAnimationFrame(
  render
)

function render() {
  requestAnimationFrame(render)
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

function initializedBoard() {

  // The board is an array of arrays.
  // Each array represents a column of tiles
  // Create the initial array (which will hold columns)
  const board = []

  // initialize board and add walls
  for (let x = 0; x < gridWidth; x++) {

    // create a column for each horizontal position
    board[x] = []

    // Make the column as tall as needed
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

  return board
}

function tick() {
  turn = turn + 1
  if (turn % 2 === 0) {
    movePlayer(playerOne)
  } else {
    movePlayer(playerTwo)
  }

  function movePlayer(player) {
    let xVelocity = 0
    let yVelocity = 0

    if (player.direction === 'up') {
      yVelocity = -1
    } else if (player.direction === 'right') {
      xVelocity = 1
    } else if (player.direction === 'down') {
      yVelocity = 1
    } else if (player.direction === 'left') {
      xVelocity = -1
    } else {
      throw new Error('player direction is goofy')
    }

    // Record player location for next time
    player.x += xVelocity
    player.y += yVelocity

    // Check if player lost
    if (board[player.x][player.y]) {
      alert(player.name + ' loses')
      // Stop processing the game
      clearInterval(tickInterval);
    }

    // Update player location on board
    board[player.x][player.y] = player
  }
}

// When a keyboard key is pressed, handle changing player directions
function handleKeydownEvent(event) {
  if (event.key === 'w') {
    // Prevent player from moving directly back onto themselves
    if (playerOne.direction !== 'down') {
      playerOne.direction = 'up'
    }
  } else if (event.key === 'd') {
    if (playerOne.direction !== 'left') {
      playerOne.direction = 'right'
    }
  } else if (event.key === 's') {
    if (playerOne.direction !== 'up') {
      playerOne.direction = 'down'
    }
  } else if (event.key === 'a') {
    if (playerOne.direction !== 'right') {
      playerOne.direction = 'left'
    }
  } else if (event.key === 'ArrowUp') {
    if (playerTwo.direction !== 'down') {
      playerTwo.direction = 'up'
    }
  } else if (event.key === 'ArrowRight') {
    if (playerTwo.direction !== 'left') {
      playerTwo.direction = 'right'
    }
  } else if (event.key === 'ArrowDown') {
    if (playerTwo.direction !== 'up') {
      playerTwo.direction = 'down'
    }
  } else if (event.key === 'ArrowLeft') {
    if (playerTwo.direction !== 'right') {
      playerTwo.direction = 'left'
    }
  }
}
