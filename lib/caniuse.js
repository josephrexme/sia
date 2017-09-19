const caniuse = require('caniuse-api')
const _pick = require('lodash/pick')
const typeOf = require('typeof')

const explain = supportObject => {
  const description = {
    y: 'available since version',
    n: 'no support on versions <=',
    x: 'requires prefix on versions <=',
    a: 'partial support on versions <='
  }
  return Object.keys(supportObject).map(key => {
    return `${description[key]} ${supportObject[key]}`
  }).join("\n")
}

module.exports = feature => {
  return new Promise((resolve, reject) => {
    const matches = caniuse.find(feature)
    if(matches.length){
      if(typeOf(matches) === 'array' && matches.length > 1){
        resolve(`
These were the matches for ${feature}:
${matches.join(', ')}
Enter one of them to see its support
        `)
      }else{
        const pickedBrowsers = _pick(caniuse.getSupport(matches), [
          'android',
          'chrome',
          'edge',
          'firefox',
          'ie',
          'opera',
          'safari'
        ])
        resolve(`
Support for ${matches}
${Object.keys(pickedBrowsers).map(browser => {
return `
*${browser}*
${explain(_pick(pickedBrowsers[browser], ['y','x','a','n']))}
`
}).join('')}
        `)
      }
    }else{
      resolve(`There's nothing on ${feature} in the caniuse DB`)
    }
  })
}
