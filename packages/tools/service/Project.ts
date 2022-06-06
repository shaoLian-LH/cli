import downloadGitRepo from 'download-git-repo'
import { wrapLoading } from '../func/loading.js'
import { exitWithError, info, error } from './Logger.js'
import { execSync } from 'child_process'
import { celebrate } from '../func/celebrate.js'
import path from 'path'
import { projectPresets, presetList, projectChoices } from '../setting/presets.js'

export interface ITemplate { 
  template: projectChoices
  dir: string
  projectName: string
  tag?: string | undefined
  packageManager: string | undefined
  wake?: boolean | undefined
}

class Project {

  private async _moveToProjectDir(targetPath: string) {
    process.chdir(`${targetPath}/`)
  }

  private async _downloadTemplate(
    website: string,
    address: string,
    tag: string | undefined,
    dest: string,
    cloneOptions = {},
  ) {
    const repositoryAddress = `${website}:${address}${tag ? `#${tag}` : ''}`

    const downloadTemplateRepo = () => new Promise((resolve, reject) => {
      downloadGitRepo(repositoryAddress, dest, cloneOptions, (err: Error | undefined) => {
        if (!err) {
          resolve(true)
        } else {
          reject()
          exitWithError(err)
        }
      })
    })

    await wrapLoading(downloadTemplateRepo, '正在下载模板\n')
  }

  private async _initGitRepository() {
    await wrapLoading(() => {
      execSync('git init')
    }, '正在初始化git仓库', {
      success: 'git仓库初始化成功',
      failed: 'git仓库初始化失败'
    })
  }

  private async _installDependencies(packageManager?: string) {
    if (!packageManager) {
      return
    }
    try {
      info('\n正在拉取依赖...')
      switch (packageManager) {
      case 'npm':
        execSync('npm install', { stdio: 'inherit' })
        break;
      case 'yarn':
        execSync('yarn', { stdio: 'inherit' })
        break;
      case 'pnpm':
        execSync('pnpm install', { stdio: 'inherit' })
        break;
      }
    } catch (err) {
      error('\n安装依赖时出错\n')
      exitWithError(err)
    }
  }

  async createWithTemplate({ template, dir, projectName, tag, packageManager, wake }: ITemplate) {
    const preset = projectPresets[template]
    if (!preset) {
      error(`没有该模板 ${preset}`)
      info(`当前支持：${presetList}`)
      exitWithError('没有对应的模板')
    }
    const { website, address, tag: defaultTag } = preset
    const targetPath = path.resolve(process.cwd(), `./${dir ? dir : ''}`, `./${projectName}`)
    await this._downloadTemplate(
      website,
      address,
      tag || defaultTag,
      targetPath
    )
    this._moveToProjectDir(targetPath)
    await this._initGitRepository()
    await this._installDependencies(packageManager)
    celebrate(
      `${dir ? path.resolve(dir, `./${projectName}`) : projectName}`,
      { awakeVSCode: !!wake, packageManager }
    )
  }
}

export default Project