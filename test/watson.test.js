const expect = require('chai').expect
const watson = require('../lib/watson')

describe('Watson', function() {
  this.timeout(5000)
  it('Can reach the conversation API', done => {
    watson('').then(reply => {
      expect(reply).to.equal('Hello. How can I help you?')
      done()
    }).catch(done)
  })
})
