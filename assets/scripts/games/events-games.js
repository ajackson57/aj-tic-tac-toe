'use strict'

// const gamesApi = require('../games/api-games.js')
// const gamesUi = require('../games/ui-games.js')
// const getFormFields = require('../../../lib/get-form-fields')

const onCellClick = function (event) {
  event.preventDefault()
  console.log('Cell target: ', event.target)
  // gamesApi.index()
  //   .then(gamesUi.onSuccess)
  //   .catch(gamesUi.onError)
}

module.exports = {
  onCellClick
}
