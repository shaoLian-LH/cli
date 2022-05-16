'use strict'
const downloadGitRepo = require('download-git-repo')
const { wrapLoading } = require('../func/loading.js')
const { exitWithError, info, error } = require('./Logger.js')
const { execSync } = require('child_process')
const { celebrate } = require('../func/celebrate.js')
const path = require('path')
const { projectPresets } = require('../setting/presets.js')

class Project { 

  async _moveToProjectDir(targetPath) { 
    process.chdir(`${targetPath}/`)
  }

  async _downloadTemplate(
    website,
    address,
    tag,
    dest,
    cloneOptions = { },

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

  async _initGitRepository() { 
    await wrapLoading(() => { 
      execSync('git init')
    }, '正在初始化git仓库', {
      success: 'git仓库初始化成功',
      failed: 'git仓库初始化失败'
    })
  }

  async _installDependencies({
    dir,
    projectName,
  } = {
    dir: undefined,
    projectName: undefined
  }) { 
    try {
      info('\n正在拉取依赖...')
      execSync('yarn', { stdio: 'inherit' })
      celebrate(`${dir ? path.resolve(dir, `./${projectName}`) : projectName}`)
    } catch (err) { 
      error('\n安装依赖时出错\n')
      info(err)
    }
  }

  async createWithTemplate({ template, dir, projectName, tag}) {
    const { website, address, tag: tagSetting } = projectPresets[template]
    const targetPath = path.resolve(process.cwd(), `./${dir ? dir : ''}`, `./${projectName}`)
    await this._downloadTemplate(
      website,
      address,
      tag || tagSetting.default,
      targetPath
    )
    this._moveToProjectDir(targetPath)
    await this._initGitRepository()
    await this._installDependencies({ dir, projectName })
  }
}

module.exports = Project