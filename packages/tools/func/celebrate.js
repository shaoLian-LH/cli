const { info } = require('../service/Logger.js')
const { execSync } = require('child_process')

const autoWakeVSCode = (project) => { 
  try {
    execSync(`code ${project}`)
  } catch (_ignoredError) { 
  }
}

module.exports.celebrate = (project, { awakeVSCode, packageManager } = { awakeVSCode: true, packageManager: undefined }) => { 
  info('\n🎉 创建结束')
  if (!packageManager) {
    info(`🛹 请进入 ${project} 文件夹`)
    info('🔧 进行依赖拉取，运行工程')
  } else { 
    info(`🛹 请进入 ${project} 文件夹，运行工程\n`)
  }
  if (awakeVSCode) { 
    autoWakeVSCode(project)
  }
}