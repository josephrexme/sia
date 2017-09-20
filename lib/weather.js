const weather = require('weather-js')
const _pick = require('lodash/pick')

module.exports = {
  now: location => {
    return new Promise((resolve, reject) => {
      weather.find({ search: location, degreeType: 'F' }, (err, result) => {
        if(err){
          reject(`Could not find weather for: ${location} : ${err}`)
        }
        const filtered = _pick(result[0].current, [
          'temperature',
          'humidity',
          'windspeed',
          'day',
          'observationpoint'
        ])
        resolve(`
${Object.keys(filtered).map(field => {
    return `${field}: ${filtered[field]}`
  }).join("\n")}
        `)
      })
    })
  },
  forecast: location => {
    return new Promise((resolve, reject) => {
      weather.find({ search: location, degreeType: 'F' }, (err, result) => {
        if(err){
          reject(`Could not find weather for: ${location} : ${err}`)
        }
        const filtered = _pick(result[0].forecast[2], [
          'skytextday',
          'low',
          'high',
          'day'
        ])
        resolve(`
${Object.keys(filtered).map(field => {
    return `${field}: ${filtered[field]}`
  }).join("\n")}
        `)
      })
    })
  }
}
