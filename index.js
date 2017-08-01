const dotenv = require('dotenv').config();
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const bot_token = process.env.SLACK_BOT_TOKEN || '';

const rtm = new RtmClient(bot_token);

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for(const c of rtmStartData.channels){
    if(c.is_member && c.name === 'general') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name}, but not connected to channel yet`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  rtm.sendMessage('Hello! I am a sentient droid', channel);
});

rtm.on(CLIENT_EVENTS)

rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  // console.log('messages', message);
  if(message.text === '!about'){
    rtm.sendMessage('I am a bot and was made by Joseph Rex', channel);
  }
});
