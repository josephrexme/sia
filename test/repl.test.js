const expect = require('chai').expect
const repl = require('../lib/repl')

describe('REPL', function() {
  it('can execute JavaScript', () => {
    expect(repl.js('Math.ceil(23.4)')).to.equal('24')
  })
  it('can execute Ruby', done => {
    repl.rb('Math::cos(0)').then(reply => {
      expect(reply).to.equal("1.0\n")
      done()
    }).catch(done)
  })
  it('converts single quotes to double for ruby', done => {
    repl.rb("'hello'").then(reply => {
      expect(reply).to.equal("hello\n")
      done()
    }).catch(done)
  })
  it('executes nested puts without failure', done => {
    repl.rb("puts 'hello'").then(reply => {
      expect(reply).to.equal("hello\n\n")
      done()
    }).catch(done)
  })
  it('prevents system calls and shell execution in ruby', done => {
    repl.rb("`uname`").then(reply => {
      expect(reply).to.equal("Unsafe characters found")
      done()
    }).catch(done)
    repl.rb("system(uname)").then(reply => {
      expect(reply).to.equal("Unsafe characters found")
    })
    repl.rb("exec(uname)").then(reply => {
      expect(reply).to.equal("Unsafe characters found")
    })
    repl.rb("%x(uname)").then(reply => {
      expect(reply).to.equal("Unsafe characters found")
    })
    repl.rb('require "open3"').then(reply => {
      expect(reply).to.equal("Unsafe characters found")
    })
  })
})
