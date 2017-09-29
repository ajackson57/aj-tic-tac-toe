'use strict'

const currentBoard = require('../store-game-board')
const gameBoard = require('./game-board')

const getGamesSuccess = function (data) {
  console.log('Data from get games :', data)
  $('#content').text('Get games succesfull')
  currentBoard.allGames = new gameBoard.Games(data.games)
}

const getGamesFailure = function (error) {
  console.error(error)
  $('#content').text('Error on get games: ' + error)
}
const newGameSuccess = function (data) {
  console.log('Data from new game :', data)
  $('#content').text('New game succesfull')
  gameBoard.inistializeGame(data)
}
const newGameFailure = function (error) {
  console.error(error)
  $('#content').text('Error on new game: ' + error)
}
const getGameSuccess = function (data) {
  console.log('Data from new game :', data)
  $('#content').text('Get game succesfull')
  gameBoard.inistializeGame(data)
}
const getGameFailure = function (error) {
  console.error(error)
  $('#content').text('Error on get game: ' + error)
}
const saveGameSuccess = function (data) {
  console.log('Data from save game :', data)
  $('#content').text('Save game succesfull')
}

const saveGameFailure = function (error) {
  console.error(error)
  $('#content').text('Error on save game: ' + error)
}
const getStatisticsSuccess = function (data) {
  console.log('Data from save game :', data)
  $('#content').text('Save game succesfull')
}

const getStatisticsFailure = function (error) {
  console.error(error)
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

const moveFeedback = function (feedback) {
  $('#content').text(feedback)
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
  moveFeedback
}
