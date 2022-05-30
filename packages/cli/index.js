#! /usr/bin/env node
const pkg = require('./package.json')
const { program } = require('commander')
const { createProject, checkNodeVersion, checkNewCliVersion } = require('@slfk/cli-tools')

checkNodeVersion(pkg.engines.node, 'slfk create')
checkNewCliVersion(pkg.version)

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

