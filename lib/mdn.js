const mdn = require('mdn-links')

module.exports = entries => {
  const splitted = entries.split(' ')
  if(splitted.length === 2 && splitted[1].length){
    return mdn.getLink(splitted[0], splitted[1])
  } else {
    return mdn.getLink(entries)
  }
}
