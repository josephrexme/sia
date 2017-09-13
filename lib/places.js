const dotenv = require('dotenv').config()
const GoogleLocations = require('google-locations')

const locations = new GoogleLocations(process.env.GOOGLE_LOCATIONS)

module.exports = location => {
  return new Promise((resolve, reject) => {
    locations.searchByAddress({ address: '1600 Amphitheatre Pkwy, Mountain View, CA', name: 'Goo', maxResults: 2, rankby: 'prominence', radius: 5000 }, (err, response) => {
      for(let index in response.details){
        console.log(`Potential match: ${response.details[index].name}`)
      }
      for(let index in response.errors){
        console.log('Error looking up place details: ', response.errors[index])
      }
    })
  })
}
