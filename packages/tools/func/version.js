const semver = require('semver')
const process = require('process')
const { error, info } = require('../service/Logger.js')
const { execSync } = require('child_process')
const chalk = require('chalk')
const { exit } = require('./exit.js')

const checkNodeVersion = (requiredVersion, command) => { 
  if (!semver.satisfies(process.version, requiredVersion, { includePrerelease: true })) { 
    error(`当前命令 ${command} 需要在 ${requiredVersion} 版本下执行，
但当前环境为 Node ${process.version}
请进行调整`)
    exit(1)
  }
}

const checkNewCliVersion = (curVersion) => { 
  const res = execSync('npm show @slfk/cli version', { encoding: 'utf-8' }).replace('\n', '')
  if (semver.gt(res, curVersion)) { 
    const splitContent = '--------------'
    const wrapperContent = `-${splitContent}${splitContent}${String('-').repeat(res.length)}${splitContent}${splitContent}--`
    
    info(`
  ${wrapperContent}
  |${splitContent}       新版本 ${chalk.green(res)} 已发布        ${splitContent}|
  |${splitContent}请运行 ${chalk.green(`npm i -g @slfk/cli`)} 进行更新${splitContent}|
  ${wrapperContent}\n`)
  }
}

module.exports = {
  checkNodeVersion,
  checkNewCliVersion
}