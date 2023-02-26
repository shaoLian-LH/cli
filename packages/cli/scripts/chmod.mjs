import chmod from 'chmod'
import path from 'path'

chmod(path.join(process.cwd(), 'lib', 'index.js'), {
  owner: {
    read: true,
    write: true,
    execute: true
  },
  group: {
    read: true,
    write: true,
    execute: true
  },
  others: {
    read: true,
    write: true,
    execute: true
  }
})