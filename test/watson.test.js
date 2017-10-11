const expect = require('chai').expect
const watson = require('../lib/watson')

describe('Watson', function() {
  this.timeout(5000)
  it('Can reach the conversation API', done => {
    watson('').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
  it('can handle weather response', done => {
    watson('What is the weather like in Milwaukee').then(reply => {
      expect(reply).to.match(/It's a .+ in Milwaukee.+/)
      done()
    }).catch(done)
  })
  it('joins multiple sys-location entities', done => {
    watson('What is the weather like in Milwaukee, Wisconsin').then(reply => {
      expect(reply).to.match(/It's a .+ in Milwaukee.+/)
      done()
    }).catch(done)
  })
})
