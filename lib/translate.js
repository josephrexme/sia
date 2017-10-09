require('dotenv').config()
const translate = require('@google-cloud/translate')({
  key: process.env.TRANSLATE_API
})

module.exports = word => {
  return new Promise((resolve, reject) => {
    translate.translate(word, 'en', (err, res) => {
      if(err){ return reject(err) }
      resolve(res)
    })
  })
}
