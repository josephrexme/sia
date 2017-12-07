require('dotenv').config()
const request = require('request')
const baseurl = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API}&t=`

module.exports = title => {
  return new Promise((resolve, reject) => {
    request.get(baseurl+title, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        const parsed = JSON.parse(body)

        resolve(`${parsed.Title} is a ${parsed.Year} ${parsed.Type} with ratings ${parsed.Ratings.map(rating => `${rating.Value} from ${rating.Source}`).join(', ')}. It has a ${parsed.Runtime} runtime, genre is ${parsed.Genre}. Here's the plot:
${parsed.Plot}`)

      } else {
        return reject(error)
      }
    })
  })
}

