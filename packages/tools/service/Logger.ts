import chalk, { Color } from 'chalk'
import { exit } from '../func/exit.js'

class Logger {

  _dyeing(contents: any[], color: Color) { 
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

  log(...args: any[]) { 
    console.log(...args)
  }

  info(...args: any[]) {
    console.log(...this._dyeing([...args], 'blue'))
  }

  error(...args: any[]) { 
    console.log(...this._dyeing([...args], 'red'))
  }

  warn(...args: any[]) { 
    console.log(...this._dyeing([...args], 'yellow'))
  }
}

export const log = function (...args: any[]) {
  new Logger().log(...args)
}

export const info = function (...args: any[]) { 
  new Logger().info(...args)
}

export const error = function (...args: any[]) { 
  new Logger().error(...args)
}

export const exitWithError = function(...args: any[]) { 
  new Logger().error(...args)
  exit(0)
}

export const warn = function (...args: any[]) { 
  new Logger().warn(...args)
}
