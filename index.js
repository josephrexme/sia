const dotenv = require('dotenv').config();
const Rivescript = require('rivescript');
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const token = process.env.SLACK_BOT_TOKEN || '';

const rs = new Rivescript();
const rtm = new RtmClient(token);

const respond = (command) => (
  {
    welcome: 'Welcome to the team. Feel free to check out the channels'
  }[command]
);

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for(const c of rtmStartData.channels){
    if(c.is_member && c.name === 'newbot-test') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name}, but not connected to channel yet`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log('Connection opened');
  // rtm.sendMessage('Hello! I am a sentient droid', channel);
});

rtm.on(CLIENT_EVENTS)

rtm.start();

rs.loadDirectory('./brain', () => {
  rs.sortReplies();
  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log(message);
    const commandPrefix = '`';
    const commands = ['welcome', 'yt', 'wild west wednesday'];
    const firstword = message.text.slice(1).split(' ')[0];
    const reply = rs.reply('Joseph', message.text.slice(1));
    console.log(firstword, commands.indexOf(firstword));
    if(message.text.slice(0, 1) === commandPrefix && commands.indexOf(firstword) === -1){
      rtm.sendMessage(reply, channel);
    } else if(commands.indexOf(firstword) !== -1){
      rtm.sendMessage(respond(firstword), message.channel || channel);
    }
  });
});
