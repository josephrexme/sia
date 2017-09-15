const Rivescript = require('rivescript')

const AsyncMessenger = function(messenger, macros, onReady) {
  const self = this
  self.messenger = messenger
  self.rs = new Rivescript({ utf8: true, caseSensitive: true })
  self.rs.unicodePunctuation = new RegExp(/[~]/)

  self.sendMessage = (message, messageText) => {
    const reply = self.rs.reply(message.user, messageText)
    if(reply.then){
      reply.then(replyStr => {
        self.messenger.sendMessage(replyStr, message.channel)
      }).catch(err => console.log(err))
    }else{
      self.messenger.sendMessage(reply, message.channel)
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
