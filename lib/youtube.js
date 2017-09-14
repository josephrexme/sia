const dotenv = require('dotenv').config()
const YT = require('youtube-node')

const YouTube = new YT()

YouTube.setKey(process.env.YOUTUBE_API_KEY)
YouTube.addParam('type', 'video')
YouTube.addParam('videoEmbeddable', 'true')
YouTube.addParam('videoSyndicated', 'true')

module.exports = topic => {
  return new Promise((resolve, reject) => {
    YouTube.search(topic, 1, (error, result) => {
      if(error){ reject(error) }
      if(result.items.length){
        const id = result.items[0].id
        if(id.videoId){
          const url = `https://www.youtube.com/watch?v=${id.videoId}`
          resolve(url)
        }else if(id.channelId){
          const url = `https://www.youtube.com/channel/${id.channelId}`
          resolve(`All ${topic}'s video can be found here ${url}`)
        }else{
          resolve("I couldn't find any video on that")
        }
      } else {
        resolve("I couldn't find any video on that")
      }
    })
  })
}
