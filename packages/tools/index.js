'use strict';

const { createProject } = require('./func/createProject.js')
const { exit } = require('./func/exit.js')
const { wrapLoading } = require('./func/loading.js')
const { checkNewCliVersion, checkNodeVersion } = require('./func/version.js')

module.exports = {
  createProject: createProject,
  exit: exit,
  wrapLoading: wrapLoading,
  checkNewCliVersion: checkNewCliVersion,
  checkNodeVersion: checkNodeVersion
}