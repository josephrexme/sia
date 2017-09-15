const dotenv = require('dotenv').config()
const _pick = require('lodash/pick')
const GoogleLocations = require('google-locations')

const locations = new GoogleLocations(process.env.GOOGLE_LOCATIONS)

module.exports = location => {
  return new Promise((resolve, reject) => {
    locations.searchByAddress({ address: location, name: location, maxResults: 2, rankby: 'prominence', radius: 5000 }, (err, response) => {
      if(response && response.details){
        const filtered = response.details.map(match => {
          return _pick(match.result, [
            'name',
            'international_phone_number',
            'formatted_address',
            'vicinity',
            'website'
          ])
        })
        resolve(`
Potential matches:
${ filtered.map(filter => {
  return Object.keys(filter).map(field => {
    return `${field}: ${filter[field]}
`
  }).join('')
}).join("---------------\n") }
        `)
      } else if(err || response.errors.length){
        resolve("I couldn't get anything on that location")
      }
    })
  })
}
