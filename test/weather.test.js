const expect = require('chai').expect
const weather = require('../lib/weather')

describe('Weather', function() {
  this.timeout(5000)
  it('reports object string of weather', (done) => {
    weather('Milwaukee, WI').then((result) => {
      expect(result).to.be.a('string')
      done()
    }).catch(done)
  })
})
