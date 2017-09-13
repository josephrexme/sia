const dotenv = require('dotenv').config()
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
})

const RT = /^RT @\w*:\s*/

module.exports = topic => {
  return new Promise((resolve, reject) => {
    client.get('search/tweets', { q: topic, lang: 'en' }, (err, tweets, response) => {
      if(err){
        reject(`I don't know anything about ${topic}`)
      }
      if(tweets.statuses.length === 0){
        resolve("I don't think much about it, actually")
      }else{
        let [ maxCount, maxIndex ] = [ 0, 0 ]
        tweets.statuses.forEach((tweet, index) => {
          const count = tweet.retweet_count + tweet.favorite_count
          if(count > maxCount){
            maxCount = count
            maxIndex = index
          }
        })
        const bestTweet = tweets.statuses[maxIndex].text
        const result = RT.exec(bestTweet)
        if(result !== null){
          bestTweet = bestTweet.substring(result[0].length)
        }
        resolve(bestTweet)
      }
    })
  })
}
