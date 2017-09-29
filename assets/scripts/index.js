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
// const game = require('./games/game-board')
// const store = require('./store')

// On document ready
const authEvents = require('./auth/events-auth')

// On document ready
$(() => {
  // game.inistializeGame(game.Game())
  authEvents.addHandlers()
  gameEvents.addHandlers()
})
