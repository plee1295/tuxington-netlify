const axios = require('axios')

function getRandomJoke () {
  axios.get('https://official-joke-api.appspot.com/jokes/random')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return {
        setup: 'Sorry, I could not think of one right now.',
        punchline: ''
      }
    })
}

exports.getRandomJoke = getRandomJoke