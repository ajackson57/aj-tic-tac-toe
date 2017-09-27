'use strict'

// const gamesApi = require('../games/api-games.js')
// const gamesUi = require('../games/ui-games.js')
// const getFormFields = require('../../../lib/get-form-fields')
const game = require('./game-board')
// const store = require('../store')

const onCellClick = function (event) {
  event.preventDefault()
  // console.log('Cell event: ', event)
  // console.log('Cell index:', event.target.cellIndex)
  // console.log('Row index:', event.target.parentElement.rowIndex)
  // console.log('Cell value:', event.target.value)
  if (event.target.textContent === 'x' || event.target.textContent === 'o') {
    alert('Please select a blank cell!')
    return
  }
  if (game.currentPlayer === 'x') {
    event.target.textContent = 'x'
  } else {
    event.target.textContent = 'o'
  }
  if (game.checkForWinner(game.currentPlayer) === game.currentPlayer) {
    $('#content').text('We have a winner and its player: ' + game.currentPlayer)
    game.inistializeGame(game.name, game.email)
    return
  }
  game.togglePlayer()
  // gamesApi.index()
  //   .then(gamesUi.onSuccess)
  //   .catch(gamesUi.onError)
}

const onSaveGame = function (event) {
  event.preventDefault()
  console.log('Caught save event')
  game.saveGame()
}

module.exports = {
  onCellClick,
  onSaveGame
}
