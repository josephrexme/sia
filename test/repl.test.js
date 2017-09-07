const expect = require('chai').expect
const repl = require('../repl')

describe('REPL', () => {
  it('can execute JavaScript', () => {
    expect(repl.js(console.log("hi"))).to.equal('hi')
  })
  it('does not execute commands in string', () => {
    expect(repl.js('console.log("hi")')).to.equal('hi')
  })
})
