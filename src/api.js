require('dotenv').config()
import { App, ExpressReceiver } from '@slack/bolt'

const expressReceiver = new ExpressReceiver({
  signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
  processBeforeResponse: true
})

const app = new App({
  signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
  token: `${process.env.SLACK_BOT_TOKEN}`,
  receiver: expressReceiver
})

export async function handler (event, context) {
  const payload = event?.body ? JSON.parse(event.body) : undefined
  if (payload && payload.type && payload.type === 'url_verification') {
    return {
      statusCode: 200,
      body: payload.challenge
    }
  }
}