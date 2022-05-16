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
        choices: [{ // TODO: 项目模板
          name: '项目',
          value: TEMPLATE_MAIN_TYPE.PROJECT,
          disabled: 'TODO'
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
  libraryTemplateInquirer
}