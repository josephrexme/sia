const expect = require('chai').expect
const repl = require('../lib/repl')

describe('REPL', function() {
  it('can execute JavaScript', () => {
    expect(repl.js('Math.ceil(23.4)')).to.equal('24')
  })
})
