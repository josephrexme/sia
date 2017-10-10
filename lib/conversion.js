const convert = require('convert-units')

const supportedUnit = unit => {
  const wordUnit = {
    fahrenheit: () => 'F',
    celsius: () => 'C',
    pound: () => 'lb',
    get pounds() { return this.pound },
    ounce: () => 'oz',
    gram: () => 'g',
    inch: () => 'in',
    get inches() { return this.inch },
    feet: () => 'ft-us',
    miles: () => 'mi',
    kilogram: () => 'kg'
  }
  return wordUnit.hasOwnProperty(unit) ? wordUnit[unit]() : unit
}

const checkUnit = unit => {
  if(convert().possibilities().includes(unit)){
    return true
  }
  return false
}

module.exports = word => {
  let final
  const [value, fromUnit,, toUnit] = word.split(' ')
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
