const chalk = require('chalk')
const { exit } = require('../func/exit.js')

class Logger {
  log(...args) { 
    console.log(...args)
  }

  info(...args) { 
    console.log(chalk.blue(...args))
  }

  error(...args) { 
    console.log(chalk.red(...args))
  }

  warn(...args) { 
    console.log(chalk.yellow(...args))
  }
}

module.exports.log = function () {
  new Logger().log(...arguments)
}

module.exports.info = function () { 
  new Logger().info(...arguments)
}

module.exports.error = function () { 
  new Logger().error(...arguments)
}

module.exports.exitWithError = function() { 
  new Logger().error(...arguments)
  exit(0)
}

module.exports.warn = function () { 
  new Logger().warn(arguments)
}
