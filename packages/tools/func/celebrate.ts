import { info } from '../service/Logger.js'
import { execSync } from 'child_process'
import Emoji from 'node-emoji'

const autoWakeVSCode = () => { 
  try {
    execSync(`code .`)
  } catch (_ignoredError) { 
    // ignore error catch
  }
}

interface ICelebrate { 
  awakeVSCode: boolean
  packageManager: string | undefined
}

export const celebrate = (project: string, { awakeVSCode, packageManager }: ICelebrate = { awakeVSCode: true, packageManager: undefined }) => { 
  info(`\n${Emoji.get('tada')} 创建结束`)
  if (!packageManager) {
    info(`${Emoji.get('skateboard')} 请进入 ${project} 文件夹`)
    info(`${Emoji.get('wrench')} 进行依赖拉取，运行工程\n`)
  } else { 
    info(`${Emoji.get('skateboard')} 请进入 ${project} 文件夹，运行工程\n`)
  }
  if (awakeVSCode) { 
    autoWakeVSCode()
  }
}