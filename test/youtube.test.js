const expect = require('chai').expect
const youtube  = require('../lib/youtube')

describe('YouTube', function() {
  this.timeout(5000)
  it('handles empty results gloriously', done => {
    youtube("mabooloRexcaboolo").then(reply => {
      expect(reply).to.equal("I couldn't find any video on that")
      done()
    }).catch(done)
  })
  it('fetches a video URL', done => {
    youtube("Fuck this shit I'm out").then(reply => {
      expect(reply).to.equal('https://www.youtube.com/watch?v=5FjWe31S_0g')
      done()
    }).catch(done)
  })
  it('falls back for searches that only match channels', done => {
    const searchPhrase = "PhiberOptics"
    youtube(searchPhrase).then(reply => {
      expect(reply.indexOf(`All ${searchPhrase}'s video`)).to.equal(0)
      done()
    }).catch(done)
  })
})
