const ora = require('ora')

module.exports.wrapLoading = async (func, msg = '', options = {}) => { 
  const spinner = ora(msg)
  const {
    color = 'yellow',
    success = '创建成功',
    failed = '创建失败'
  } = options
  spinner.color = color

  spinner.start()

  return new Promise(async (resolve) => { 
    const res = await func()
    resolve(res)
  })
  .then((res) => { 
    spinner.succeed(success)
    return res
  }).catch(() => { 
    spinner.fail(failed)
  }).finally(() => { 
    spinner.stop()
  })
  
}