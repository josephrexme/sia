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
})
