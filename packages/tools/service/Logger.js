const chalk = require('chalk')
const { exit } = require('../func/exit.js')

class Logger {

  _dyeing(contents, color) { 
    let content = contents
    if (Array.isArray(contents)) { 
      content = content.map(arg => { 
        if (typeof arg === 'string') { 
          return chalk[color](arg)
        }
        return arg
      })
    }
    return content
  }

  log(...args) { 
    console.log(...args)
  }

  info() {
    console.log(...this._dyeing([...arguments], 'blue'))
  }

  error(...args) { 
    console.log(...this._dyeing([...arguments], 'red'))
  }

  warn(...args) { 
    console.log(...this._dyeing([...arguments], 'yellow'))
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
  new Logger().warn(...arguments)
}
