'use strict'

const store = require('../store')
const uiGames = require('../games/ui-games')
// const gameEvents = require('../games/events-games')

const signUpSuccess = function (data) {
  $('#content').text('Sign up was succesfull')
  $('#sign-up').hide()
}

const signUpFailure = function (error) {
  $('#content').text('Eror on sign up: ', error)
}
const signInSuccess = function (data) {
  store.user = data.user
  $('#content').text('Signed in succesfully')
  $('#sign-in').hide()
  $('#game-board').show()
  $('#get-statistics').show()
  $('#get-games').show()
  $('#get-game').show()
  $('#new-game').show()
  $('#sign-out-menu').show()
  $('#change-password-menu').show()
  $('#sign-in-menu').hide()
  $('#sign-up-menu').hide()
}

const signInFailure = function (error) {
  $('#content').text('Error on sign-in: ', error)
}
const changePasswordSuccess = function (data) {
  ('Data from CPW :', data)
  $('#content').text('Password changed succesfully')
}

const changePasswordFailure = function (error) {
  $('#content').text('Error on password change: ', error)
}
const signOutSuccess = function (data) {
  store.user = {}
  $('#content').text('Signed out succesfully')
  hideAuthContent()
  uiGames.hideGameContent()
  $('#sign-in-menu').show()
  $('#sign-up-menu').show()
}

const signOutFailure = function (error) {
  $('#content').text('Error sign out: ', error)
}
const hideAuthContent = function () {
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#sign-out-menu').hide()
  $('#change-password-menu').hide()
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  hideAuthContent
}
