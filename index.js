const dotenv = require('dotenv').config()
const RtmClient = require('@slack/client').RtmClient
const RTM_EVENTS = require('@slack/client').RTM_EVENTS
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const AsyncMessenger = require('./lib/asyncMessenger')

const token = process.env.SLACK_BOT_TOKEN || ''
const defaultChannel = process.env.DEFAULT_CHANNEL || 'general'

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

const messenger = new AsyncMessenger(rtm, {
  jsREPL: require('./lib/repl').js,
  currentWeather: require('./lib/weather').now,
  forecastWeather: require('./lib/weather').forecast,
  searchPlaces: require('./lib/places'),
  searchTwitter: require('./lib/twitter'),
  searchWikipedia: require('./lib/wikipedia'),
  youtube: require('./lib/youtube'),
  canIuse: require('./lib/caniuse')
}, function() {
  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('Message', message) // stdout message for debug
    if(message.text && message.text.length && !message.thread_ts){ // Reply non-threads
      const nameMatch = /(^|[\s|@])(sia)/i.test(message.text)
      if(nameMatch){ // Answer name mentions
        messenger.sendMessage(message, message.text.replace(/@?sia/i, ''))
      }else if(message.channel.slice(0, 1) === 'D'){ // Answer DMs
        messenger.sendMessage(message, message.text)
      }
    }
  })
})
