'use strict'

const currentBoard = require('../store-game-board')
const api = require('./api-games')
// const Cell = function (player, row, column) {
//   this.player = player
//   this.row = row
//   this.column = column
// }

// const addCell = function (player, row, column) {
//   this._cells.push(new Cell(player, row, column))
// }
const checkForWinner = function (player) {
  console.log()
  let winner = 'No Winner'
  const board = $('#game-board > tbody')
  if (board[0].rows[0].children[0].textContent === player &&
      board[0].rows[0].children[1].textContent === player &&
      board[0].rows[0].children[2].textContent === player) {
    winner = player
  } else if (board[0].rows[1].children[0].textContent === player &&
      board[0].rows[1].children[1].textContent === player &&
      board[0].rows[1].children[2].textContent === player) {
    winner = player
  } else if (board[0].rows[2].children[0].textContent === player &&
      board[0].rows[2].children[1].textContent === player &&
      board[0].rows[2].children[2].textContent === player) {
    winner = player
  } else if (board[0].rows[0].children[0].textContent === player &&
      board[0].rows[1].children[0].textContent === player &&
      board[0].rows[2].children[0].textContent === player) {
    return player
  } else if (board[0].rows[0].children[1].textContent === player &&
      board[0].rows[1].children[1].textContent === player &&
      board[0].rows[2].children[1].textContent === player) {
    winner = player
  } else if (board[0].rows[0].children[2].textContent === player &&
      board[0].rows[1].children[2].textContent === player &&
      board[0].rows[2].children[2].textContent === player) {
    winner = player
  } else if (board[0].rows[0].children[0].textContent === player &&
      board[0].rows[1].children[1].textContent === player &&
      board[0].rows[2].children[2].textContent === player) {
    winner = player
  } else if (board[0].rows[0].children[2].textContent === player &&
      board[0].rows[1].children[1].textContent === player &&
      board[0].rows[2].children[0].textContent === player) {
    winner = player
  }
  return winner
}
const getWinner = function () {
  // const moves = this.
  let winner = 'noWinner'
  if (this.cells[0] !== '' && this.cells[0] === this.cells[1] && this.cells[2]) {
    winner = this.cells[0]
  } else if (this.cells[3] !== '' && this.cells[3] === this.cells[4] && this.cells[5]) {
    winner = this.cells[3]
  } else if (this.cells[6] !== '' && this.cells[6] === this.cells[7] && this.cells[8]) {
    winner = this.cells[6]
  } else if (this.cells[0] !== '' && this.cells[0] === this.cells[3] && this.cells[6]) {
    winner = this.cells[6]
  } else if (this.cells[1] !== '' && this.cells[1] === this.cells[4] && this.cells[7]) {
    winner = this.cells[1]
  } else if (this.cells[2] !== '' && this.cells[2] === this.cells[5] && this.cells[8]) {
    winner = this.cells[2]
  } else if (this.cells[0] !== '' && this.cells[0] === this.cells[4] && this.cells[8]) {
    winner = this.cells[0]
  } else if (this.cells[2] !== '' && this.cells[2] === this.cells[4] && this.cells[6]) {
    winner = this.cells[2]
  } else if (this.cells.every(element => element !== '')) {
    winner = 'drawGames'
  }
  return winner
}

const togglePlayer = function () {
  if (this.currentPlayer === 'x') {
    this.currentPlayer = 'o'
  } else {
    this.currentPlayer = 'x'
  }
}
const Player = function () {
  this.id = 0
  this.email = ''
}
const updateGame = function (index, cellValue) {
  this.cells[index] = cellValue
  const winner = this.getWinner()
  if (winner === 'x' || winner === 'y' || winner === 'draw') {
    this.over = true
  }
  const update = {
    'game': {
      'cell': {
        'index': index,
        'value': cellValue
      },
      'over': this.over
    }
  }
  console.log('In updateGame with game id: ' + this.id)
  api.update(this.id, update)
  return winner
}

const getGame = function (gameId) {
  currentBoard.currentGame = currentBoard.allGames.games.find((game) => game.id === gameId)
  if (currentBoard.currentGame !== {}) {
    console.log('Get game found game: ', gameId)
    console.log('Current game: ', currentBoard.currentGame)
    return true
  } else {
    return false
  }
}

const getStatistics = function () {
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  console.log('Get statistics')
  if (currentBoard.allGames !== {}) {
    this.totalGames = currentBoard.allGames.games.length
    for (let i = 0; i < currentBoard.allGames.games.length; i++) {
      const game = new GameFromGame(currentBoard.allGames.games[i])
      if (game.over === true) {
        this.completedGames += 1
      } else {
        this.incompleteGames += 1
        continue
      }
      const winner = game.getWinner()
      if (winner === 'playerX') {
        this.xWon += 1
      } else if (winner === 'playerY') {
        this.yWon += 1
      } else if (winner === 'draw') {
        this.drawGames += 1
      }
    }
  } else {
    // need to get boards
  }
}
const Games = function (games) {
  this.games = games
  this.totalGames = 0
  this.completedGames = 0
  this.incompleteGames = 0
  this.drawGames = 0
  this.xWon = 0
  this.yWon = 0
  this.getStatistics = getStatistics
}
const Game = function () {
  this.id = 0
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.player_x = new Player()
  this.player_y = null
  // this.addCell = addCell
  this.currentPlayer = 'x'
  this.togglePlayer = togglePlayer
  this.checkForWinner = checkForWinner
  this.updateGame = updateGame
  this.getWinner = getWinner
}

const GameFromGame = function (game) {
  this.id = game.id
  this.cells = game.cells
  this.over = game.over
  this.player_x = game.player_x
  this.player_y = game.player_y
  // this.addCell = addCell
  this.currentPlayer = 'x'
  this.togglePlayer = togglePlayer
  this.checkForWinner = checkForWinner
  this.updateGame = updateGame
  this.getWinner = getWinner
}

const inistializeGame = function (data) {
  console.log('In initializeGame with data: ' + data)
  currentBoard.currentGame = new GameFromGame(data.game)
  console.log('In initializeGame with game id: ' + currentBoard.currentGame.id)
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  const board = $('#game-board > tbody')
  // console.log('The board ', board[0].rows)
  //  console.log('Intialize Game')
  let i = 0
  for (let rowIndex = 0; rowIndex < board[0].rows.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].rows[rowIndex].children.length; colIndex++) {
       // console.log('Cell: ' + i + ',' + j + 'has value:' + board[0].rows[i].children[j].textContent)
      board[0].rows[rowIndex].children[colIndex].textContent = currentBoard.currentGame.cells[i++]
    }
  }
}

const updateGameFromDom = function () {
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  const board = $('#game-board > tbody')
  // console.log('The board ', board[0].rows)
  //  console.log('Intialize Game')
  let i = 0
  for (let rowIndex = 0; rowIndex < board[0].rows.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].rows[rowIndex].children.length; colIndex++) {
       // console.log('Cell: ' + i + ',' + j + 'has value:' + board[0].rows[i].children[j].textContent)
      currentBoard.currentGame.cells[i++] = board[0].rows[rowIndex].children[colIndex].textContent
    }
  }
}

module.exports = {
  inistializeGame,
  updateGameFromDom,
  updateGame,
  getStatistics,
  getWinner,
  checkForWinner,
  togglePlayer,
  Game,
  GameFromGame,
  Games,
  getGame
}
