const { info } = require('../service/Logger.js')
const path = require('path')

module.exports.celebrate = (project) => { 
  info('\n🎉 创建结束')
  info(`🛹 请进入 ${project} 文件夹，运行工程\n`)
}