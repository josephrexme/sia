require('dotenv').config()
const _first = require('lodash/first')
const watsonConversation = require('watson-developer-cloud/conversation/v1')

const conversation = new watsonConversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: watsonConversation.VERSION_DATE_2017_05_26
})

conversation.message({
  workspace_id: '3b1dea56-84e2-4773-8866-a4ed46d20a79',
  input: { text: 'Hey' },
  context: {}
}, (err, response) => {
  /* eslint-disable no-console */
  if(err){ console.error(err) }
  // console.log(_first(response.output.text))
  // console.log(response.context.conversation_id)
  const intent = _first(response.intents).intent
  console.log(intent)
  // console.log(JSON.stringify(response, null, 2))
})
