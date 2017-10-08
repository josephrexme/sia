require('dotenv').config()
const _first = require('lodash/first')
const watsonConversation = require('watson-developer-cloud/conversation/v1')
const weather = require('./weather')

const conversation = new watsonConversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: watsonConversation.VERSION_DATE_2017_05_26
})

let context = {}

module.exports = message => {
  return new Promise((resolve, reject) => {
    conversation.message({
      workspace_id: process.env.WATSON_WORKSPACE_ID,
      input: { text: message },
      context
    }, (err, response) => {
      if(err){
        return reject(err)
      }
      context = response.context
      context.fish = 'seafish'
      const intents = response.intents
      const entities = response.entities
      if(entities.length && intents.length && _first(intents).intent === 'Weather'){
        const location = entities.filter(e => e.entity === 'sys-location')
          .map(e => e.value).join(', ')
        weather(location).then(reply => resolve(reply))
      } else {
        resolve(_first(response.output.text))
      }
    })
  })
}
