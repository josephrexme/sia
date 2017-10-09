require('dotenv').config()
const translate = require('@google-cloud/translate')({
  key: process.env.TRANSLATE_API
})

const languageMap = {
  english: 'en',
  french: 'fr',
  arabic: 'ar',
  chinese: 'zh',
  dutch: 'nl',
  german: 'de',
  hindi: 'hi',
  japenese: 'ja',
  latin: 'la',
  spanish: 'es'
}

module.exports = word => {
  const toIndex = word.lastIndexOf('to')
  const languageWord = word.substr(0, toIndex - 1)
  const toLanguage = word.substr(toIndex + 3)
  const code = languageMap.hasOwnProperty(toLanguage) ? languageMap[toLanguage] : toLanguage
  return new Promise((resolve, reject) => {
    translate.translate(languageWord, code, (err, res) => {
      if(err){
        resolve(`I only understand ${Object.keys(languageMap).join(', ')}`)
        return reject(err)
      }
      resolve(res)
    })
  })
}
