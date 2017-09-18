const {VM} = require('vm2')
const exec = require('child_process').exec

module.exports = {
  js: code => {
    const vm = new VM()
    try {
      return vm.run(code).toString()
    } catch (e) {
      return e.toString();
    }
  },
  rb: code => {
    return new Promise((resolve, reject) => {
      const unsafe = new RegExp(/(`|%x|system|exec|method|call|unpack|eval|require|Dir|File|ENV|Process|send|load|include|Object)/, 'g')
      const formattedCode = code.replace(/'/g, '"')
      if(unsafe.test(formattedCode)){
        resolve('Unsafe characters found')
      } else {
        exec(`ruby -e 'puts ${formattedCode}'`, (err, stdout, stderr) => {
          if(err){ reject(err) }
          resolve(stdout)
        })
      }
    })
  }
}
