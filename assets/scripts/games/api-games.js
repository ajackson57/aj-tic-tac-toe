'use strict'

const config = require('../config.js')
const store = require('../store')
// const currentBoard = require('../store-game-board')

const index = function (over) {
  if (over === undefined) {
    return $.ajax({
      url: config.apiOrigin + '/games',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }})
  } else {
    return $.ajax({
      url: config.apiOrigin + '/games?over=' + over,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }})
  }
}

const create = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

const show = function (gameId) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}
const update = function (gameId, data) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const saveGame = function (name, email) {
  // #game-board > tbody > tr:nth-child(1) > td:nth-child(1)
  // #game-board > tbody > tr:nth-child(2) > td:nth-child(3)
  // #game-board > tbody > tr:nth-child(1)
  console.log('Save Game')
  const board = $('#game-board > tbody')
  console.log('The board ', board[0].rows)

  for (let i = 0; i < board[0].rows.length; i++) {
    for (let j = 0; j < board[0].rows[i].children.length; j++) {
      console.log('Cell: ' + i + ',' + j + 'has value:' + board[0].rows[i].children[j].textContent)
    }
  }
}

module.exports = {
  index,
  create,
  show,
  saveGame,
  update
}
