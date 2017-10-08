require('dotenv').config()
const _first = require('lodash/first')
const watsonConversation = require('watson-developer-cloud/conversation/v1')

const conversation = new watsonConversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: watsonConversation.VERSION_DATE_2017_05_26
})

let context = {}

module.exports = message => {
  return new Promise((resolve, reject) => {
    /* eslint-disable no-console */
    console.log(context)
    conversation.message({
      workspace_id: process.env.WATSON_WORKSPACE_ID,
      input: { text: message },
      context
    }, (err, response) => {
      if(err){ reject(err) }
      context = response.context
      resolve(_first(response.output.text))
    })
  })
}
