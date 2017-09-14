const expect = require('chai').expect
const wikipedia = require('../lib/wikipedia')

const phrase = 'Reactimatron circuit drone'

describe('Wikipedia', function() {
  this.timeout(5000)
  it('should fetch short info on topic', done => {
    wikipedia('blackhole').then(result => {
      expect(result).to.be.a('string')
      done()
    }).catch(done)
  })

  it('gives a feedback when no result', done => {
    wikipedia(phrase).then(result => {
      expect(result.length).to.be.above(2)
      done()
    }).catch(done)
  })

  it('has a detailed feedback for failed cases', done => {
    wikipedia(phrase).then(result => {
      expect(result).to.equal(`I don't know much about ${phrase}`)
      done()
    }).catch(done)
  })

  it('handles ambiguous topics', done => {
    wikipedia('TOR').then(result => {
      expect(result).to.equal('Tor is ambiguous can you be more specific')
      done()
    }).catch(done)
  })
})

