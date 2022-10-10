import ora, { Color } from 'ora'

export interface IWrapOptions { 
  color?: Color
  success?: string | undefined
  failed?: string | undefined
}

export const wrapLoading = async (func: () => void | Promise<any>, msg = '', options: IWrapOptions = {}) => { 
  const spinner = ora(msg)
  const {
    color = 'yellow',
    success = '创建成功',
    failed = undefined
  } = options
  spinner.color = color

  spinner.start()

  return new Promise(async (resolve, reject) => { 
    try {
      const res = await func()
      resolve(res)
    } catch (e) { 
      reject(e)
    }
  })
  .then((res) => { 
    spinner.succeed(success)
    return res
  }).catch((err) => { 
    spinner.fail(failed || err.message)
  }).finally(() => { 
    spinner.stop()
  })
  
}