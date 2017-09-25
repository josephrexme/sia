const expect = require('chai').expect
const places = require('../lib/places')

describe('Places', function() {
  this.timeout(5000)
  it('gets a big string of location data', done => {
    places('University of Wisconsin, Milwuakee').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
  it('contains relevant information to find place', done => {
    places('University of Wisconin, Milwuakee').then(reply => {
      expect(reply.indexOf('name')).to.not.equal(-1)
      expect(reply.indexOf('international_phone_number')).to.not.equal(-1)
      expect(reply.indexOf('formatted_address')).to.not.equal(-1)
      expect(reply.indexOf('vicinity')).to.not.equal(-1)
      expect(reply.indexOf('website')).to.not.equal(-1)
      done()
    }).catch(done)
  })
  it('handles unknown locations', done => {
    places('Poopland').then(reply => {
      expect(reply).to.equal("I couldn't get anything on that location")
      done()
    }).catch(done)
  })
})
