const convert = require('convert-units')

const supportedUnit = unit => {
  let replace
  switch (unit.toLowerCase()) {
  case 'fahrenheit':
    replace = 'F'
    break
  case 'celsius':
    replace = 'C'
    break
  case 'pound':
    replace = 'lb'
    break
  case 'pounds':
    replace = 'lb'
    break
  case 'ounce':
    replace = 'oz'
    break
  case 'gram':
    replace = 'g'
    break
  case 'kilogram':
    replace = 'kg'
    break
  default:
    replace = unit
  }
  return replace
}

const checkUnit = unit => {
  if(convert().possibilities().includes(unit)){
    return true
  }
  return false
}

module.exports = word => {
  let final
  /* eslint-disable no-unused-vars */
  const [value, fromUnit, _, toUnit] = word.split(' ')
  if(checkUnit(supportedUnit(fromUnit)) && checkUnit(supportedUnit(toUnit))){
    const result = convert(value).from(supportedUnit(fromUnit)).to(supportedUnit(toUnit))
    if(result % 1 == 0) {
      final = result
    } else {
      final = Number(result).toFixed(2)
    }
    return final
  } else {
    return 'Unknown conversion unit used'
  }
}
