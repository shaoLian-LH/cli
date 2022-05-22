const { info, error } = require('../service/Logger.js')
const { execSync } = require('child_process')

const autoWakeVSCode = (project) => { 
  try {
    execSync(`code ./${project}`)
  } catch (_ignoredError) { 
    error('code失败 - ', _ignoredError)
  }
}

module.exports.celebrate = (project, { awakeVSCode } = { awakeVSCode: true }) => { 
  info('\n🎉 创建结束')
  info(`🛹 请进入 ${project} 文件夹，运行工程\n`)
  info
  if (awakeVSCode) { 
    autoWakeVSCode(project)
  }
}