const expect = require('chai').expect
const weather = require('../lib/wikipedia')

describe('Weather', function() {
  this.timeout(5000)
  it('reports object string of weather', (done) => {
    weather.now('Milwaukee, WI').then((result) => {
      expect(result).to.be.a('string')
      done()
    }).catch(done)
  })
  it('is a valid JSON in string', (done) => {
    weather.now('Cleveland, OH').then((result) => {
      expect(JSON.parse(result)).to.have.property('humidity')
      done()
    }).catch(done)
  })
  it('is a valid JSON in string', (done) => {
    weather.forecast('Chicago, IL').then((result) => {
      expect(JSON.parse(result)).to.have.property('day')
      done()
    }).catch(done)
  })
})

