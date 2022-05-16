#! /usr/bin/env node
const pkg = require('./package.json')
const { program } = require('commander')
const { createProject } = require('@slfk/cli-tools')

// 创建模板
program
  .version(pkg.version, '-v, --version', '查看版本')
  .command('create <name>')
  .option('-t, --template <template>', '模板的tag标签')
  .option('-d, --dir <targetDir>', '生成的目标文件夹', false)
  .option('-f, --force', '强制生成', false)
  .description('创建一个工程')
  .action((name, options) => {
    createProject(name, options)
  })

program.parse(process.argv)

