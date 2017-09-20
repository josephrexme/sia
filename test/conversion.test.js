const expect = require('chai').expect
const convert = require('../lib/conversion')

describe('Conversion', function() {
  it('converts known units', () => {
    expect(convert('2 d to h')).to.equal(48)
  })
  it('supports custom units', () => {
    expect(convert('70 fahrenheit to celsius')).to.equal('21.11')
    expect(convert('200 pounds to kilogram')).to.equal('90.72')
    expect(convert('45 kg to pound')).to.equal('99.21')
    expect(convert('90 ounce to gram')).to.equal('2551.45')
  })
  it('rounds floats to to decimal places', () => {
    expect(convert('160 lb to kg').split('.')[1]).to.have.lengthOf(2)
  })
  it('reports unknown conversion units', () => {
    expect(convert('50 dollars to pounds')).to.equal('Unknown conversion unit used')
    expect(convert('64 Gb to peta')).to.equal('Unknown conversion unit used')
  })
})
