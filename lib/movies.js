require('dotenv').config()
const request = require('request')
const baseurl = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API}&t=`

module.exports = title => {
  return new Promise((resolve, reject) => {
    request.get(baseurl+title, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        const parsed = JSON.parse(body)

        resolve(`${parsed.Title} is a ${parsed.Year} ${parsed.Type}${parsed.Ratings ? ` with ratings ${parsed.Ratings.map(rating => `${rating.Value} from ${rating.Source}`).join(', ')}` : ''}. ${ !parsed.Runtime || parsed.Runtime === "N/A" ? '' : `It has a ${parsed.Runtime} runtime, `}Genre is ${parsed.Genre}.${ !parsed.Plot || parsed.Plot === "N/A" ? '' : ` Here's the plot:
${parsed.Plot}` }`)

      } else {
        return reject(error)
      }
    })
  })
}

