const math = require('mathjs')

module.exports = function(expression) {
  try{
    const answer = math.eval(expression)
    return answer.toString()
  } catch(error) {
    return error.toString()
  }
}
