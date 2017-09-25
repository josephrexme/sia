const request = require('request')
const _first = require('lodash/first')
const _last = require('lodash/last')
const host = 'http://cpv2api.com'

module.exports = query => {
  return new Promise((resolve, reject) => {
    if(query === 'picks'){
      request(`${host}/pens/picks`, (error, response, body) => {
        if(!error && response.statusCode === 200){
          /* eslint-disable no-console */
          const pickedPens = JSON.parse(body).data.map(pen => pen.link).join("\n")
          resolve(`These are the currently picked pens\n${pickedPens}`)
        } else {
          reject(error)
        }
      })
    }else if(_first(query.split(' ')) === 'profile') {
      const [,,user] = query.split(' ')
      request(`${host}/profile/${user}`, (error, response, body) => {
        if(!error && response.statusCode === 200){
          const profile = JSON.parse(body).data
          const proCheck = profile.pro ? 'and a pro account' : ''
          resolve(`${profile.nicename} has ${profile.followers} followers ${proCheck}`)
        } else {
          reject(error)
        }
      })
    } else if(_first(query.split(' ')) === 'last') {
      const secondArg = query.split(' ')[1]
      const user = _last(query.split(' '))
      const cap = isNaN(secondArg) ? 1 : Number(secondArg)
      request(`${host}/pens/public/${user}`, (error, response, body) => {
        if(!error && response.statusCode === 200){
          const latest = JSON.parse(body).data.slice(0, cap).map(pen => pen.link).join("\n")
          resolve(`Here you go\n${latest}`)
        } else {
          reject(error)
        }
      })
    } else if(_first(query.split(' ')) === 'search') {
      const word = _last(query.split(' '))
      request(`${host}/search/pens?q=${word}`, (error, response, body) => {
        if(!error && response.statusCode === 200){
          const match = _first(JSON.parse(body).data).link
          resolve(`Here's what I could find on ${word} \n${match}`)
        } else {
          reject(error)
        }
      })
    }
  })
}
