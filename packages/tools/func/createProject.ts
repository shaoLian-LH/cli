import { error, exitWithError } from '../service/Logger.js'
import { exit }  from './exit.js'
import { wrapLoading } from './loading.js'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import ProjectService from '../service/Project.js'
import {
  basicInquirer,
  mainTemplateTypeInquirer,
  libraryTemplateInquirer,
  projectTemplateInquirer
} from '../service/Collector.js'
import { TEMPLATE_MAIN_TYPE } from '../enumeration/TEMPLATE_MAIN_TYPE.js'
import { projectChoices } from '../setting/presets.js'

interface IGeneratorOptions { 
  template?: projectChoices
  tag?: string
  dir?: string
  force?: boolean
  wake?: boolean
}

class Generator { 
  private projectName: string
  private options: IGeneratorOptions

  constructor (name: string, options: IGeneratorOptions){
    this.projectName = name
    this.options = options || {}  
  }

  async _generateGuarder({ force, targetPath }: { force: boolean, targetPath: string }) { 
    if (fs.existsSync(targetPath) && !force) {
      exitWithError(`已存在目录 ${this.projectName} 在 ${targetPath}`)
    }
  }

  async _clearCurrentFolder(targetPath: string) { 
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
      force = false,
      wake = true
    } = this.options

    const targetPath = path.resolve(process.cwd(), `./${dir || ''}`, this.projectName)

    await this._generateGuarder({ targetPath, force })

    const { packageManager } = await basicInquirer()

    let presetTemplate = template

    // 没有命中预设模板时，进行询问
    if (!template) {
      const { templateType } = await mainTemplateTypeInquirer()
      switch (templateType) { 
      
      case TEMPLATE_MAIN_TYPE.PROJECT:
        const { runtime, library, cssLibrary } = await projectTemplateInquirer()
        presetTemplate = `${runtime}-${library}${cssLibrary ? `-${cssLibrary}` : ''}` as unknown as projectChoices
        break;

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
      template: presetTemplate as projectChoices,
      dir: dir as string,
      projectName: this.projectName,
      tag,
      packageManager,
      wake
    })
  }
}

const createProject = (
  name: string,
  options = {}
) => { 
  new Generator(name, options).create()
}

export { createProject }