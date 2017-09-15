const expect = require('chai').expect
const places = require('../lib/places')

describe('Places', function() {
  this.timeout(5000)
  it('gets a big string of location data', done => {
    places('University of Wisconin, Milwuakee').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
})
