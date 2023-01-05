const axios = require('axios')

async function getRandomJoke () {
  const response = await axios.get('https://official-joke-api.appspot.com/jokes/random')
  return response.data
}

exports.getRandomJoke = getRandomJoke