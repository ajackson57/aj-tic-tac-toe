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

// On document ready
$(() => {
  $('#game-board').on('click', gameEvents.onCellClick)
})
