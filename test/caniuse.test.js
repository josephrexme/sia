const expect = require('chai').expect
const caniuse = require('../lib/caniuse')

describe('Can I Use', function() {
  it('list support for single matched feature', done => {
    caniuse('css-filters').then(reply => {
      expect(reply).to.be.a('string')
      done()
    }).catch(done)
  })
  it('returns a list of matched features for ambiguous input', done => {
    caniuse('filter').then(reply => {
      expect(reply.slice(1, 34)).to.equal('These were the matches for filter')
      done()
    }).catch(done)
  })
  it('has a valid response when no feature is matched', done => {
    caniuse('catnip').then(reply => {
      expect(reply).to.equal("There's nothing on catnip in the caniuse DB")
      done()
    }).catch(done)
  })
  it('converts all entries to lowercase', done => {
    const feature = 'requestIdleCallback'
    caniuse(feature).then(reply => {
      expect(reply.slice(13, 32)).to.equal(feature.toLowerCase())
      done()
    }).catch(done)
  })
})
