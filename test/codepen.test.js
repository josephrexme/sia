const expect = require('chai').expect
const codepen = require('../lib/codepen')

describe('CodePen', function() {
  this.timeout(5000)
  it('can get recent picks', done => {
    codepen('picks').then(reply => {
      expect(reply.slice(0, 35)).to.equal('These are the currently picked pens')
      done()
    }).catch(done)
  })
  it('can get profile data', done => {
    codepen('profile of shshaw').then(reply => {
      expect(reply).to.match(/Shaw has \d+ followers and a pro account/)
      done()
    }).catch(done)
  })
  it('gets last pen of a user', done => {
    codepen('last pen of shshaw').then(reply => {
      expect(reply).to.have.string('https://codepen.io/shshaw')
      done()
    }).catch(done)
  })
  it('gets last specified number of pens by a user', done => {
    codepen('last 3 pen of shshaw').then(reply => {
      expect(reply.slice(12, reply.length).split("\n")).to.have.lengthOf(3)
      done()
    }).catch(done)
  })
  it('can search pens', done => {
    codepen('search fractals').then(reply => {
      expect(reply).to.match(/Here's what I could find on fractals.+/)
      done()
    }).catch(done)
  })
})
