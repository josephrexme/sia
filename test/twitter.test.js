const expect = require('chai').expect
const twitter = require('../lib/twitter')

describe('Twitter', function() {
  this.timeout(5000)
  it('fetches thoughts off twitter', done => {
    twitter('React versus Vue').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
  it('replies when no matches found', done => {
    twitter('buparcesto estorendo').then(reply => {
      expect(reply).to.equal("I don't think much about it, actually")
      done()
    }).catch(done)
  })
  it('shows non-viral tweets with no retweets', done => {
    twitter('RiceTea').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
  it('strips off the RT from retweets', done => {
    twitter('Donald Trump').then(reply => {
      expect(reply).to.not.match(/^RT @\w*:\s*/)
      done()
    }).catch(done)
  })
})
