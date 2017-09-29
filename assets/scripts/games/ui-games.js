'use strict'

const currentBoard = require('../store-game-board')
const gameBoard = require('./game-board')

const getGamesSuccess = function (data) {
  console.log('Data from get games :', data)
  $('#content').text('Get games succesfull')
  currentBoard.allGames = data.games
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

module.exports = {
  getGamesSuccess,
  getGamesFailure,
  getGameSuccess,
  getGameFailure,
  newGameSuccess,
  newGameFailure,
  saveGameSuccess,
  saveGameFailure
}
