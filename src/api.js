const { App, ExpressReceiver } = require('@slack/bolt')
const dotenv = require('dotenv')
const {
  parseRequestBody,
  generateReceiverEvent,
  isUrlVerificationRequest
} = require("./utils/utils")

dotenv.config()

const expressReceiver = new ExpressReceiver({
  signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
  processBeforeResponse: true
})

const app = new App({
  signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
  token: `${process.env.SLACK_BOT_TOKEN}`,
  receiver: expressReceiver
})

app.event('app_mention', async ({ event, context, client, say }) => {
  if (event.text.includes('joke')) {
    try {
      await say({
        'blocks': [
          {
            'type': 'section',
            'text': {
              'type': 'mrkdwn',
              'text': 'This is an example joke response.'
            }
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }
})

exports.handler = async (event, context) => {
  const payload = parseRequestBody(event.body, event.headers['content-type'])

  if (isUrlVerificationRequest(payload)) {
    return {
      statusCode: 200,
      body: payload?.challenge
    }
  }

  const slackEvent = generateReceiverEvent(payload)
  await app.processEvent(slackEvent)

  return {
    statusCode: 200,
    body: ''
  }
}