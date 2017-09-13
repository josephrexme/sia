const Rivescript = require('rivescript')
const repl = require('./repl')

const AsyncMessenger = function(messenger, macros, onReady) {
  const self = this
  self.messenger = messenger
  self.rs = new Rivescript({ utf8: true, caseSensitive: true })
  self.rs.unicodePunctuation = new RegExp(/[~]/)

  self.sendMessage = (user, message, channel) => {
    const reply = self.rs.reply(user, message)
    console.log(reply, typeof reply)
    if(reply.then){
      reply.then(replyStr => {
        self.messenger.sendMessage(replyStr, channel)
      })
    }else{
      self.messenger.sendMessage(reply, channel)
    }
  }

  self.replyCommands = message => {
    // Take out the command prefix
    const filteredText = message.text.slice(1)
    // Take the code ignoring first word as command
    const code = filteredText.slice(filteredText.indexOf(' ') + 1)
    // Assume first word is language being passed to repl
    const lang = filteredText.split(' ')[0]
    // If language exists among available repl languages process repl
    if(Object.keys(repl).indexOf(lang) === -1){
      const reply = self.rs.reply(message.user, filteredText)
      self.sendMessage(message.user, filteredText, message.channel)
    }else{
      self.messenger.sendMessage(repl[lang](code), message.channel)
    }
  }

  self.rs.loadDirectory('./brain', () => {
    self.rs.sortReplies()
    onReady()
  })

  Object.keys(macros).forEach(macro => {
    self.rs._objlangs[macro] = 'javascript'
    self.rs._handlers.javascript._objects[macro] = (rs, args) => {
      console.log('args', args.join(' '))
      const response = macros[macro](args.join(' '))
      return response
    }
  })
}

module.exports = AsyncMessenger
