import inquirer from 'inquirer';
import { getPackageManagerList } from './PackageManagerList.js';
import { TEMPLATE_MAIN_TYPE } from '../enumeration/TEMPLATE_MAIN_TYPE.js';
// 询问用户使用的主模板类型
export const mainTemplateTypeInquirer = async () => {
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
                }, {
                    name: '脚手架',
                    value: TEMPLATE_MAIN_TYPE.CLI,
                    disabled: 'TODO'
                }],
        },
    ]);
};
// 询问用户使用哪一种项目模板
export const projectTemplateInquirer = async () => {
    return inquirer.prompt([{
            type: 'list',
            name: 'runtime',
            message: '您要基于什么版本创建工程？',
            choices: [{
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
                }, {
                    name: 'element-plus',
                    value: 'element'
                }]
        }, {
            type: 'list',
            name: 'cssLibrary',
            message: '您要基于什么css库创建工程？',
            choices: [{
                    name: 'tailwind',
                    value: 'tailwind'
                }, {
                    name: '由不得你',
                    value: undefined,
                    disabled: 'TODO'
                }]
        }]);
};
// 询问用户使用哪一种工具库模板
export const libraryTemplateInquirer = async () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'template',
            message: '您要创建什么模板？',
            choices: [{
                    name: 'typescript-rollup',
                    value: 'rollup'
                }]
        }]);
};
// 通用的，基础的询问
export const basicInquirer = async () => {
    const packageManagerList = getPackageManagerList().map(manager => ({ name: manager, value: manager }));
    return inquirer
        .prompt([{
            type: 'list',
            name: 'packageManager',
            message: '您想使用什么包管理器？',
            choices: [...packageManagerList, { name: '不进行依赖安装', value: undefined }]
        }]);
};
