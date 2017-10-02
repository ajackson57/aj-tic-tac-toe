'use strict'

const currentBoard = require('../store-game-board')
const gameBoard = require('./game-board')

const getGamesSuccess = function (data) {
  $('#content').text('Get games succesfull')
  currentBoard.allGames = new gameBoard.Games(data.games)
  currentBoard.allGames.getStatistics()
  displayStatistics()
  displayGames()
  $('#games-list-heading').show()
  $('#satus-of-games').show()
}

const getGamesFailure = function (error) {
  $('#content').text('Error on get games: ' + error)
}
const newGameSuccess = function (data) {
  $('#content').text('New game succesfull')
  gameBoard.inistializeGame(data)
}
const newGameFailure = function (error) {
  $('#content').text('Error on new game: ' + error)
}
const getGameSuccess = function (data) {
  $('#content').text('Get game succesfull')
  gameBoard.inistializeGame(data)
}
const getGameFailure = function (error) {
  $('#content').text('Error on get game: ' + error)
}
const saveGameSuccess = function (data) {
  $('#content').text('Save game succesfull')
}

const saveGameFailure = function (error) {
  $('#content').text('Error on save game: ' + error)
}
const getStatisticsSuccess = function (data) {
  $('#content').text('Save game succesfull')
}

const getStatisticsFailure = function (error) {
  $('#content').text('Error on save game: ' + error)
}

const displayStatistics = function () {
  const games = currentBoard.allGames
  $('#content').html('Game Statistics<br/>' + 'Total Games: ' +
  games.totalGames + '<br/>Completed Games: ' + games.completedGames +
  '<br/>Incomplete Games: ' + games.incompleteGames +
  '<br/>Games Played to Draw: ' + games.drawGames +
  '<br/>Games won by playerX: ' + games.xWon +
  '<br/>Games won by playerO: ' + games.oWon)
}

const displayGames = function () {
  const allGames = currentBoard.allGames
  // for (games
  let gameStatus = ''
  for (let i = 0; i < allGames.games.length; i++) {
    gameStatus += '<br/>' + allGames.games[i].id + '       ' + allGames.games[i].over
  }
  $('.list-of-games').html(gameStatus)
}

const moveFeedback = function (feedback) {
  $('#content').text(feedback)
}

const hideGameContent = function () {
  $('#game-board').hide()
  $('#get-statistics').hide()
  $('#get-games').hide()
  $('#get-game').hide()
  $('#new-game').hide()
  $('#games-list-heading').hide()
  $('#satus-of-games').hide()
}

module.exports = {
  getGamesSuccess,
  getGamesFailure,
  getGameSuccess,
  getGameFailure,
  newGameSuccess,
  newGameFailure,
  saveGameSuccess,
  saveGameFailure,
  getStatisticsSuccess,
  getStatisticsFailure,
  displayStatistics,
  moveFeedback,
  hideGameContent
}
