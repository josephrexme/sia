const expect = require('chai').expect
const translate = require('../lib/translate')

describe('Translate', function() {
  this.timeout(5000)
  it('can translate any language to english', done => {
    translate('嗨').then(reply => {
      expect(reply).to.equal('Hi')
      done()
    }).catch(done)
  })
})
