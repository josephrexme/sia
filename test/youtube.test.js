const expect = require('chai').expect
const youtube  = require('../lib/youtube')

describe('YouTube', function() {
  this.timeout(5000)
  it('fetches a video URL', done => {
    youtube("Fuck this shit I'm out").then(reply => {
      expect(reply).to.equal('https://www.youtube.com/watch?v=5FjWe31S_0g')
      done()
    }).catch(done)
  })
})