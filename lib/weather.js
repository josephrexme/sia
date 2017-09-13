const weather = require('weather-js')

module.exports = {
  now: location => {
    return new Promise((resolve, reject) => {
      weather.find({ search: location, degreeType: 'F' }, (err, result) => {
        if(err){
          reject(`Could not find weather for: ${location} : ${err}`)
        }
        resolve(JSON.stringify(result[0].current, null, 2))
      })
    })
  },
  forecast: location => {
    return new Promise((resolve, reject) => {
      weather.find({ search: location, degreeType: 'F' }, (err, result) => {
        if(err){
          reject(`Could not find weather for: ${location} : ${err}`)
        }
        resolve(JSON.stringify(result[0].forecast[2], null, 2))
      })
    })
  }
}
