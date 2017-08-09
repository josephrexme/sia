const {VM} = require('vm2');

module.exports = {
  js: (code) => {
    const vm = new VM();
    return vm.run(code);
  },
};
