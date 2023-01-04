const express = require('express')
const serverless = require('serverless-http')

const app = express()
const router = express.Router()

app.use(express.json())

router.get('/', (req, res) => {
  res.json({'hello': 'world'})
})

router.post('/', (req, res) => {
  res.json({'challenge': req.body.challenge})
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)