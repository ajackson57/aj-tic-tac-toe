'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const gameEvents = require('./games/events-games')
const game = require('./games/game-board')
// const store = require('./store')

// On document ready
$(() => {
  game.inistializeGame('Bob', 'bob@gmail.com')
  $('#game-board').on('click', gameEvents.onCellClick)
  $('#save-game').on('submit', gameEvents.onSaveGame)
})
