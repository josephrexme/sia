const weather = require('weather-js')
const _pick = require('lodash/pick')

module.exports = location => {
  return new Promise((resolve, reject) => {
    weather.find({ search: location, degreeType: 'F' }, (err, result) => {
      if(err){
        return reject(`Could not find weather for: ${location} : ${err}`)
      }
      const filtered = _pick(result[0].current, [
        'temperature',
        'skytext',
        'day',
        'observationpoint'
      ])
      resolve(`It's a ${filtered.skytext} ${filtered.day} in ${filtered.observationpoint} and the temperature is ${filtered.temperature} degrees`)
    })
  })
}
