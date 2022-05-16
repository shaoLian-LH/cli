
const projectPresets = {
  'rollup': {
    website: 'github',
    address: 'shaoLian-LH/rollup-ts-template',
    tag: {
      list: ['0.0.1'],
      default: '0.0.1'
    }
  },
  'vite-antd-tailwind': {
    website: 'github',
    address: 'shaoLian-LH/vite-tailwind-template',
  },
  'vue3-antd-tailwind': {
    website: 'github',
    address: 'shaoLian-LH/vite-tailwind-template',
  }
}

const presetList = Object.keys(projectPresets).join(', ')

module.exports = {
  projectPresets,
  presetList
}
