const request = require('request')
const _first = require('lodash/first')
const host = 'http://cpv2api.com'

module.exports = query => {
  return new Promise((resolve, reject) => {
    const command = _first(query.split(' '))
    const user = query.split(' ')[query.split(' ').length - 1]
    const processCmd = (cmd) => {
      const commandMap = {
        picks: () => {
          request(`${host}/pens/picks`, (error, response, body) => {
            if(!error && response.statusCode === 200){
              const pickedPens = JSON.parse(body).data.map(pen => pen.link).join("\n")
              resolve(`These are the currently picked pens\n${pickedPens}`)
            } else {
              reject(error)
            }
          })
        },
        profile: () => {
          request(`${host}/profile/${user}`, (error, response, body) => {
            if(!error && response.statusCode === 200){
              const profile = JSON.parse(body).data
              if(profile){
                const proCheck = profile.pro ? 'and a pro account' : ''
                resolve(`${profile.nicename} has ${profile.followers} followers ${proCheck}`)
              } else {
                resolve('No profile with that username found')
              }
            } else {
              reject(error)
            }
          })
        },
        last: () => {
          const secondArg = query.split(' ')[1]
          const cap = isNaN(secondArg) ? 1 : Number(secondArg)
          request(`${host}/pens/public/${user}`, (error, response, body) => {
            if(!error && response.statusCode === 200){
              const parsed = JSON.parse(body).data
              if(parsed){
                const latest = parsed.slice(0, cap).map(pen => pen.link).join("\n")
                resolve(`Here you go\n${latest}`)
              } else {
                resolve('No profile with that username found')
              }
            } else {
              reject(error)
            }
          })
        },
        most: () => {
          request(`${host}/pens/popular/${user}`, (error, response, body) => {
            if(!error && response.statusCode === 200){
              const parsed = JSON.parse(body).data
              if(parsed){
                resolve(`:heart: ${_first(parsed).link}`)
              } else {
                resolve('No profile with that username found')
              }
            } else {
              reject(error)
            }
          })
        },
        get favorite() { return this.most },
        search: () => {
          const word = query.split(' ').splice(1, query.split(' ').length).join(' ')
          request(`${host}/search/pens?q=${word}`, (error, response, body) => {
            if(!error && response.statusCode === 200){
              const match = _first(JSON.parse(body).data).link
              resolve(`Here's what I could find on ${word} \n${match}`)
            } else {
              reject(error)
            }
          })
        }
      }
      return commandMap.hasOwnProperty(cmd) ? commandMap[cmd]()
        : resolve("I don't know what you mean, ask Chris Coyier")
    }
    processCmd(command)
  })
}
