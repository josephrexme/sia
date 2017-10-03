const {VM} = require('vm2')

module.exports = {
  js: code => {
    const vm = new VM({ timeout: 1000, sandbox: {} })
    try {
      return vm.run(code).toString()
    } catch (e) {
      return e.toString()
    }
  },
}
