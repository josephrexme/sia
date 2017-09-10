const dotenv = require('dotenv').config()
const Rivescript = require('rivescript')
const RtmClient = require('@slack/client').RtmClient
const RTM_EVENTS = require('@slack/client').RTM_EVENTS
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const repl = require('./lib/repl')

const token = process.env.SLACK_BOT_TOKEN || ''
const defaultChannel = process.env.DEFAULT_CHANNEL || 'general'

const rs = new Rivescript()
const rtm = new RtmClient(token)

let channel

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for(const c of rtmStartData.channels){
    if(c.is_member && c.name === defaultChannel) { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name}`)
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log('Connection opened')
});

rtm.on(CLIENT_EVENTS)

rtm.start()

// const messenger = new AsyncMessenger(rtm)
// messenger.sendMessage(reply, message.channel)

const reply_commands = (message) => {
  // Take out the command prefix
  const filteredText = message.text.slice(1)
  // Take the code ignoring first word as command
  const code = filteredText.slice(filteredText.indexOf(' ') + 1)
  // Assume first word is language being passed to repl
  const lang = filteredText.split(' ')[0]
  // If language exists among available repl languages process repl
  if(Object.keys(repl).indexOf(lang) === -1){
    const reply = rs.reply(message.user, filteredText)
    rtm.sendMessage(reply, message.channel)
  }else{
    rtm.sendMessage(repl[lang](code), message.channel)
  }
}

rs.loadDirectory('./brain', () => {
  rs.sortReplies()
  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('Message', message) // stdout message for debug
    const commandPrefix = '`'
    if(message.text && message.text.length){
      const nameMatch = /(^|(\s|@))(sia)/i.test(message.text)
      if(message.text.slice(0, 1) === commandPrefix){ // Answer command prefix messages
        reply_commands(message)
      }else if(nameMatch){ // Answer name mentions
        const reply = rs.reply(message.user, message.text.replace(/sia/i, ''))
        rtm.sendMessage(reply, message.channel)
      }else if(message.channel.slice(0, 1) === 'D'){ // Answer DMs
        const reply = rs.reply(message.user, message.text)
        rtm.sendMessage(reply, message.channel)
      }
    }
  })
})
