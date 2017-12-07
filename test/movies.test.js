const expect = require('chai').expect
const movies = require('../lib/movies')

describe('OMDB Movies', function() {
  this.timeout(5000)
  it('gets movie description', done => {
    movies('back to the future').then(reply => {
      expect(reply.slice(0, 35)).to.equal('Back to the Future is a 1985 movie ')
      done()
    }).catch(done)
  })
})
