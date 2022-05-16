const { error, exitWithError, info } = require('../service/Logger.js')
const { exit }  = require('./exit.js')
const { wrapLoading }  = require('./loading.js')
const path = require('path')
const downloadGitRepo = require('download-git-repo')
const { projectPresets } = require('../setting/presets.js')
const fs = require('fs')
const rimraf = require('rimraf')
const { execSync } = require('child_process')
const { celebrate } = require('./celebrate.js')
class Generator { 
  constructor (name, options){
    this.projectName = name
    this.options = options || {}  
  }

  async _downloadTemplate(
    website,
    address,
    tag,
    dest,
    cloneOptions = { clone: true },

  ) { 
    const repositoryAddress = `${website}:${address}${tag ? `#${tag}` : ''}`

    const downloadTemplateRepo = () => new Promise((resolve, reject) => { 
      downloadGitRepo(repositoryAddress, dest, cloneOptions, (err) => { 
        if (!err) {
          resolve()
        } else { 
          reject()
          exitWithError(err)
        }
      })
    })

    await wrapLoading(downloadTemplateRepo, '正在下载模板\n')
  }

  async _generateGuarder({ force, dir }) { 
    const targetPath = path.resolve(process.cwd(), `./${dir || ''}`, this.projectName)
    if (fs.existsSync(targetPath) && !force) {
      exitWithError(`已存在目录 ${this.projectName} 在 ${targetPath}`)
    } else if (force) { 
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
  }

  async _moveToProjectDir(targetPath) { 
    process.chdir(`${targetPath}/`)
  }

  async _initGitRepository() { 
    await wrapLoading(() => { 
      execSync('git init')
    }, '正在初始化git仓库', {
      success: 'git仓库初始化成功',
      failed: 'git仓库初始化失败'
    })
  }

  async _installDependencies() { 
    await wrapLoading(() => { 
      execSync('yarn')
    }, '正在拉取依赖\n', {
      success: '依赖拉取完成',
      failed: '依赖安装失败'
    }).then(() => { 
      celebrate(`${this.options.dir ? path.resolve(this.options.dir, `./${this.projectName}`) : this.projectName}`)
    })   
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

    await this._generateGuarder({ force, dir })

    // 存在预设模板中，直接通过连接下载内容
    if (template) {
      const { website, address, tag: tagSetting } = projectPresets[template]
      const targetPath = path.resolve(process.cwd(), `./${dir ? dir : ''}`, `./${this.projectName}`)

      await this._downloadTemplate(
        website,
        address,
        tag || tagSetting.default,
        targetPath
      )
      this._moveToProjectDir(targetPath)
      await this._initGitRepository()
      await this._installDependencies()
    } else {
      wrapLoading(() => { 
        info(this.projectName)
      })
    }
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