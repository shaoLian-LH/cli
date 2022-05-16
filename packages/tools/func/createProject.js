const { error, exitWithError } = require('../service/Logger.js')
const { exit }  = require('./exit.js')
const { wrapLoading }  = require('./loading.js')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const ProjectService = require('../service/Project.js')
const { mainTemplateTypeInquirer, libraryTemplateInquirer } = require('../service/Collector.js')
const { TEMPLATE_MAIN_TYPE } = require('../enumeration/TEMPLATE_MAIN_TYPE.js')
class Generator { 
  constructor (name, options){
    this.projectName = name
    this.options = options || {}  
  }

  async _generateGuarder({ force, targetPath }) { 
    if (fs.existsSync(targetPath) && !force) {
      exitWithError(`已存在目录 ${this.projectName} 在 ${targetPath}`)
    }
  }

  async _clearCurrentFolder(targetPath) { 
    await wrapLoading(
      () => { 
        rimraf.sync(targetPath)
      },
      '正在删除目录',
      {
        color: 'red',
        success: '删除目录成功',
        failed: '删除目录失败'
      }
    )
  }

  async create() { 
    if (!this.projectName) { 
      error('请输入工程名')
      exit()  
    }

    const {
      template,
      tag,
      dir = false,
      force = false
    } = this.options

    const targetPath = path.resolve(process.cwd(), `./${dir || ''}`, this.projectName)

    await this._generateGuarder({ targetPath, force })

    let presetTemplate = template

    // 没有命中预设模板时，进行询问
    if (!template) {
      const { templateType } = await mainTemplateTypeInquirer()
      switch (templateType) { 

      case TEMPLATE_MAIN_TYPE.LIBRARY:
        const { template: templateFromInquirer } = await libraryTemplateInquirer()
        presetTemplate = templateFromInquirer
        break;
          
      default:
        presetTemplate = undefined
      }
    }

    if (force) { 
      await this._clearCurrentFolder(targetPath)
    }

    await new ProjectService().createWithTemplate({
      template: presetTemplate,
      dir,
      projectName: this.projectName,
      tag
    })
  }
}

const createProject = (
  name,
  options = {}
) => { 
  new Generator(name, options).create()
}

module.exports = {
  createProject
}