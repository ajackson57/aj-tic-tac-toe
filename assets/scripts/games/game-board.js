'use strict'

const Cell = function (player, row, column) {
  this.player = player
  this.row = row
  this.column = column
}

const addCell = function (player, row, column) {
  this._cells.push(new Cell(player, row, column))
}

const togglePlayer = function () {
  if (this.currentPlayer === 'x') {
    this.currentPlayer = 'o'
  } else {
    this.currentPlayer = 'x'
  }
}

const Gameboard = function (name, email) {
  this.owner = name
  this.email = email
  this._cells = []
  this.addCell = addCell
  this.currentPlayer = 'x'
  this.togglePlayer = togglePlayer
}

const inistializeGame = function (name, email) {
  const game = new Gameboard(name, email)
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  const board = $('#game-board > tbody')
  // console.log('The board ', board[0].rows)
  //  console.log('Intialize Game')
  for (let i = 0; i < board[0].rows.length; i++) {
    for (let j = 0; j < board[0].rows[i].children.length; j++) {
       // console.log('Cell: ' + i + ',' + j + 'has value:' + board[0].rows[i].children[j].textContent)
      board[0].rows[i].children[j].textContent = ''
    }
  }
  return game
}

const saveGame = function (name, email) {
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  console.log('Save Game')
  const board = $('#game-board > tbody')
  console.log('The board ', board[0].rows)

  for (let i = 0; i < board[0].rows.length; i++) {
    for (let j = 0; j < board[0].rows[i].children.length; j++) {
      console.log('Cell: ' + i + ',' + j + 'has value:' + board[0].rows[i].children[j].textContent)
    }
  }
}

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

module.exports = {
  inistializeGame,
  saveGame,
  checkForWinner,
  togglePlayer
}
