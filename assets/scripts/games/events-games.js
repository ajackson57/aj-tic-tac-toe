'use strict'

// const gamesApi = require('../games/api-games.js')
// const gamesUi = require('../games/ui-games.js')
// const getFormFields = require('../../../lib/get-form-fields')
const game = require('../store-game-board')
const api = require('./api-games')
const ui = require('./ui-games')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const currentBoard = require('../store-game-board')
// const store = require('../store')

const onCellClick = function (event) {
  event.preventDefault()
  const mapArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  // console.log('Cell event: ', event)
  // console.log('Cell index:', event.target.cellIndex)
  // console.log('Row index:', event.target.parentElement.rowIndex)
  // console.log('Cell value:', event.target.value

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
  // refactor code so it first updates and as part of the update check for over,
  // either a winner or a draw
  // if (game.currentGame.checkForWinner(game.currentGame.currentPlayer) ===
  //     game.currentGame.currentPlayer) {
  //   $('#content').text('We have a winner and its player: ' +
  //                      game.currentGame.currentPlayer)
  //   game.currentGame.updateGame(mapArray[rowIndex][colIndex], true)
  //   return
  // }
  // console.log('Current player before toggl')
  const results = game.currentGame.updateGame(mapArray[rowIndex][colIndex], event.target.textContent)
  if (game.currentGame.over && results === 'draw') {
    ui.moveFeedback('Game over it was a draw')
  } else if (game.currentGame.over) {
    ui.moveFeedback('Game over and the winner is ' + results)
  } else {
    game.currentGame.togglePlayer()
    ui.moveFeedback('It\'s player' + game.currentGame.currentPlayer + '\'s turn')
  }
  // gamesApi.index(
  //   .then(gamesUi.onSuccess)
  //   .catch(gamesUi.onError)
}

const onGetStatistics = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  console.log('Caught get statistics event')
  $('#get-games').trigger('click')
  // api.saveGame()
  //  .then(ui.getStatisticsSuccess)
  //  .catch(ui.getStatisticsFailure)
}
const onGetGames = function (event) {
  event.preventDefault()
  if (jQuery.isEmptyObject(store.user)) {
    $('#content').text('Please sign in.')
    return
  }
  console.log('Caught get games event')
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
  console.log('Caught new game event')
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
  console.log('gameForm is ', gameForm)
  // get the necessary information out of that object
  const gameId = gameForm.game.id
  console.log('Caught get game event')
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
