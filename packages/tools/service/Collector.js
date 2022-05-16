const inquirer = require('inquirer');
const { TEMPLATE_MAIN_TYPE } = require('../enumeration/TEMPLATE_MAIN_TYPE.js')

// 询问用户使用的主模板类型
const mainTemplateTypeInquirer = async function () { 
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'templateType',
        message: '您要创建什么类型的模板？',
        choices: [{
          name: '项目',
          value: TEMPLATE_MAIN_TYPE.PROJECT
        }, {
          name: '工具库',
          value: TEMPLATE_MAIN_TYPE.LIBRARY
        }, { // TODO: 脚手架模板
          name: '脚手架',
          value: TEMPLATE_MAIN_TYPE.CLI,
          disabled: 'TODO'
        }],
      },
    ])
}

const projectTemplateInquirer = async function () { 
  return inquirer.prompt([{
    type: 'list',
    name: 'runtime',
    message: '您要基于什么版本创建工程？',
    choices: [{ // TODO: Vue2 模板
      name: 'Vue2',
      value: 'vue2',
      disabled: 'TODO'
    }, {
      name: 'Vue3',
      value: 'vue3'
    }]
  }, {
    type: 'list',
    name: 'library',
    message: '您要基于什么组件库创建工程？',
    choices: [{
      name: 'Antd',
      value: 'antd'
    }, { // TODO: element-plus 模板
      name: 'element-plus',
      value: 'element',
      disabled: 'TODO'
    }]
  }, {
    type: 'list',
    name: 'cssLibrary',
    message: '您要基于什么css库创建工程？',
    choices: [{
      name: '我必须使用tailwind',
      value: 'tailwind'
    }, { // TODO: 裸工程
      name: '由不得你',
      value: undefined,
      disabled: 'TODO'
    }]
  }])
}

const libraryTemplateInquirer = async function () { 
  return inquirer
    .prompt([{
      type: 'list',
      name: 'template',
      message: '您要创建什么模板？',
      choices: [{
        name: 'typescript-rollup',
        value: 'rollup'
      }]
    }])
}

module.exports = {
  mainTemplateTypeInquirer,
  projectTemplateInquirer,
  libraryTemplateInquirer
}