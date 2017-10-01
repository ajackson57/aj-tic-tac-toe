'use strict'

const game = require('../store-game-board')
const api = require('./api-games')
const ui = require('./ui-games')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onCellClick = function (event) {
  event.preventDefault()
  const mapArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  } else if (jQuery.isEmptyObject(game.currentGame)) {
    $('#content').text('Please create a new game!')
    return
  } else if (game.currentGame.over) {
    $('#content').text('Game over, please create a new game!')
    return
  }
  const rowIndex = event.target.parentElement.rowIndex
  const colIndex = event.target.cellIndex
  if (event.target.textContent === 'x' || event.target.textContent === 'o') {
    $('#content').text('Please select a blank cell!')
    return
  }
  if (game.currentGame.currentPlayer === 'x') {
    event.target.textContent = 'x'
    // api.update()
  } else {
    event.target.textContent = 'o'
  }
  const results = game.currentGame.updateGame(mapArray[rowIndex][colIndex], event.target.textContent)
  if (game.currentGame.over && results === 'draw') {
    ui.moveFeedback('Game over it was a draw')
  } else if (game.currentGame.over) {
    ui.moveFeedback('Game over and the winner is ' + results)
  } else {
    game.currentGame.togglePlayer()
    ui.moveFeedback('It\'s player' + game.currentGame.currentPlayer + '\'s turn')
  }
}

const onGetStatistics = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  $('#get-games').trigger('click')
}
const onGetGames = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  ('Caught get games event')
  api.index()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}
const onNewGame = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  api.create()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}
const onGetGame = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  const gameForm = getFormFields(event.target)
  // get the necessary information out of that object
  const gameId = gameForm.game.id
  api.show(gameId)
    .then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
}

const addHandlers = function () {
  $('#game-board').on('click', onCellClick)
  $('#get-statistics').on('click', onGetStatistics)
  $('#get-games').on('click', onGetGames)
  $('#new-game').on('click', onNewGame)
  $('#get-game').on('submit', onGetGame)
}

module.exports = {
  addHandlers,
  onGetGames
}
