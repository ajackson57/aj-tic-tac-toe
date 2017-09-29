'use strict'

// const gamesApi = require('../games/api-games.js')
// const gamesUi = require('../games/ui-games.js')
// const getFormFields = require('../../../lib/get-form-fields')
const game = require('../store-game-board')
const api = require('./api-games')
const ui = require('./ui-games')
const getFormFields = require('../../../lib/get-form-fields')
// const currentBoard = require('../store-game-board')
// const store = require('../store')

const onCellClick = function (event) {
  event.preventDefault()
  const mapArray = [[0, 1, 2], [3, 4, 5], [6, 7, 9]]
  // console.log('Cell event: ', event)
  // console.log('Cell index:', event.target.cellIndex)
  // console.log('Row index:', event.target.parentElement.rowIndex)
  // console.log('Cell value:', event.target.value)
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
  if (game.currentGame.checkForWinner(game.currentGame.currentPlayer) ===
      game.currentGame.currentPlayer) {
    $('#content').text('We have a winner and its player: ' +
                       game.currentGame.currentPlayer)
    game.currentGame.updateGame(mapArray[rowIndex][colIndex], true)
    return
  }
  // console.log('Current player before toggl')
  game.currentGame.updateGame(mapArray[rowIndex][colIndex], true)
  game.currentGame.togglePlayer()
  // gamesApi.index()
  //   .then(gamesUi.onSuccess)
  //   .catch(gamesUi.onError)
}

const onSaveGame = function (event) {
  event.preventDefault()
  console.log('Caught save event')
  api.saveGame()
   .then(ui.saveGameSuccess)
   .catch(ui.saveGameFailure)
}
const onGetGames = function (event) {
  event.preventDefault()
  console.log('Caught get games event')
  api.index()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}
const onNewGame = function (event) {
  event.preventDefault()
  console.log('Caught new game event')
  api.create()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}
const onGetGame = function (event) {
  event.preventDefault()
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
  $('#save-game').on('click', onSaveGame)
  $('#get-games').on('click', onGetGames)
  $('#new-game').on('click', onNewGame)
  $('#get-game').on('submit', onGetGame)
}

module.exports = {
  addHandlers
}
