const expect = require('chai').expect
const translate = require('../lib/translate')

describe('Translate', function() {
  this.timeout(5000)
  it('can translate any language to english', done => {
    translate('嗨 to english').then(reply => {
      expect(reply).to.equal('Hi')
      done()
    }).catch(done)
  })

  it('can translate to supported languages', done => {
    translate('good morning to german').then(reply => {
      expect(reply).to.equal('guten Morgen')
      done()
    }).catch(done)
  })

  it('gives clear explanation for unknown languages', done => {
    translate('Hey there to vulcan').then(reply => {
      expect(reply).to.match(/I only understand .+/)
      done()
    }).catch(done)
  })
})
