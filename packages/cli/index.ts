#! /usr/bin/env node
import { program } from 'commander'
import { createProject, checkNodeVersion, checkNewCliVersion } from '@slfk/cli-tools'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), { encoding: 'utf-8' }))

checkNodeVersion(pkg.engines.node, 'slfk create')

program
  .version(pkg.version, '-v, --version', '查看版本')

// 创建模板
program
  .command('create <name>')
  .option('-t, --template <template>', '模板的tag标签')
  .option('-d, --dir <targetDir>', '生成的目标文件夹', false)
  .option('-f, --force', '强制生成', false)
  .option('-w, --wake', '生成结束后唤醒vscode（需要在全局增加code命令）', false)
  .description('创建一个工程')
  .action((name, options) => {
    createProject(name, options)
  })

program.parse(process.argv)

checkNewCliVersion(pkg.version)