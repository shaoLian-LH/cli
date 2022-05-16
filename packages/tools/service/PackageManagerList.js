'use strict'
const { execSync } = require('child_process')

const versionRegex = /d*.d*.d*/

const execCmd = (cmd) => { 
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' }).match(versionRegex).length !== 0
  } catch (e) { 
    return false
  }
}

const getPackageManagerList = () => {
  return [{
    tool: 'yarn',
    cmd: 'yarn -v'
  }, {
    tool: 'npm',
    cmd: 'npm -v'
  }, {
    tool: 'pnpm',
    cmd: 'pnpm -v'
  }]
    .map(setting => execCmd(setting.cmd) ? setting.tool : undefined)
    .filter(valid => valid)
}

module.exports = {
  getPackageManagerList
}