const expect = require('chai').expect
const mdn = require('../lib/mdn')

describe('MDN Links', function() {
  it('gets link for single global namespace entry', () => {
    expect(mdn('Symbol')).to.equal('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol')
  })

  it('gets link for double entries with method name', () => {
    expect(mdn('Element classList')).to.equal('https://developer.mozilla.org/en-US/docs/Web/API/Element/classList')
  })
})
