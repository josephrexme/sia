const expect = require('chai').expect
const math = require('../lib/math')
const repl = require('../lib/repl')

describe('Math', () => {
  it('can process math', () => {
    expect(math(2 * 12)).to.equal('24')
  })
  it('can derive sine and work with repl', () => {
    expect(repl.js(`Math.round(${math('sin(45 deg) ^ 2')} * 10) / 10`)).to.equal('0.5')
  })
})
