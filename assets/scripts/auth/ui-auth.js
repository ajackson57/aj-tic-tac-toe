'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  console.log(data)
}

const signUpFailure = function (error) {
  console.error(error)
}
const signInSuccess = function (data) {
  console.log('Data from SIS :', data)
  store.user = data.user
  $('#content').text('Signed in succesfully')
}

const signInFailure = function (error) {
  console.error(error)
  $('#content').text('Error on sign-in')
}
const changePasswordSuccess = function (data) {
  console.log('Data from CPW :', data)
  $('#content').text('Password changed succesfully')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#content').text('Error on password change')
}
const signOutSuccess = function (data) {
  console.log('Data from SOS :', data)
  store.user = {}
  $('#content').text('Signed out succesfully')
}

const signOutFailure = function (error) {
  console.error(error)
  $('#content').text('Error sign out')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
