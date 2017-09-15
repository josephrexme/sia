const expect = require('chai').expect
const weather = require('../lib/weather')

describe('Weather', function() {
  this.timeout(5000)
  it('reports object string of weather', (done) => {
    weather.now('Milwaukee, WI').then((result) => {
      expect(result).to.be.a('string')
      done()
    }).catch(done)
  })
  it('shows current day humidity', (done) => {
    weather.now('Cleveland, OH').then((result) => {
      expect(result.indexOf('humidity')).to.not.equal(-1)
      done()
    }).catch(done)
  })
  it('shows high and low for forecast', (done) => {
    weather.forecast('Chicago, IL').then((result) => {
      expect(result.indexOf('low')).to.not.equal(-1)
      done()
    }).catch(done)
  })
})
