const expect = require('chai').expect
const caniuse = require('../lib/caniuse')

describe('Can I Use', function() {
  it('can check for features', done => {
    caniuse('css-filters').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
})
