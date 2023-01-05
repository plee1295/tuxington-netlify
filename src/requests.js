const axios = require('axios')

function getRandomJoke () {
  axios.get('https://official-joke-api.appspot.com/jokes/random')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

exports.getRandomJoke = getRandomJoke