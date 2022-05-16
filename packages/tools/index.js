'use strict';

const { createProject } = require('./func/createProject.js')
const { exit } = require('./func/exit.js')
const { wrapLoading } = require('./func/loading.js')

module.exports = {
  createProject: createProject,
  exit: exit,
  wrapLoading: wrapLoading
}