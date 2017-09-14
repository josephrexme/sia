const querystring = require('querystring')
const request = require('request')
const cheerio = require('cheerio')

const getCanonicalTopic = topicURL => {
  return new Promise((resolve, reject) => {
    request(topicURL, (err, res, body) => {
      if(err){ reject(err) }
      const $ = cheerio.load(body)
      resolve($('#firstHeading').text())
    })
  })
}

const wikiSearch = topic => {
  return `https://en.wikipedia.org/w/api.php?${querystring.stringify({ action: 'opensearch', search: topic, limit: 1, namespace: 0, format: 'json' })}`
}

const getTopicDescription = (topic, resolve, reject) => {
  request(wikiSearch(topic), (error, response, body) => {
    if(!error && response.statusCode === 200){
      const wikiResponse = JSON.parse(body)
      if(!wikiResponse[2].length){
        resolve(`I don't know much about ${topic}`)
        return
      }
      const description = wikiResponse[2][0]
      if(!description || description.indexOf('This is a redirect') >= 0){
        getCanonicalTopic(wikiResponse[3][0]).then(
          canonical => {
            if(canonical !== wikiResponse[1][0]){
              getTopicDescription(canonical, resolve, reject)
            } else {
              resolve(`I don't know much about ${topic}`)
            }
          },
          () => `I don't know much about ${topic}`
        )
      } else {
        resolve(description)
      }
    } else {
      reject(error)
    }
  })
}

module.exports = topic => {
  return new Promise((resolve, reject) => {
    getTopicDescription(topic, resolve, reject)
  })
}
