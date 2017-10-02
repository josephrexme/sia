require('dotenv').config()
const watson = require('watson-developer-cloud')

const conversation = new watson.ConversationV1({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: watson.ConversationV1.VERSION_DATE_2017_05_26
})

conversation.message({
  workspace_id: '3b1dea56-84e2-4773-8866-a4ed46d20a79',
  input: { text: 'Hello' },
  context: {}
}, (err, response) => {
  /* eslint-disable no-console */
  if(err){ console.error(err) }
  console.log(JSON.stringify(response, null, 2))
})
