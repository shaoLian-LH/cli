export type projectChoices = 'rollup' | 'vite-antd-tailwind' | 'vue3-antd-tailwind' | 'vue3-element-tailwind'

export interface IProjectPreset { 
  website: string
  address: string
  tag?: string
}

const projectPresets: Record<string, IProjectPreset> = {
  'rollup': {
    website: 'github',
    address: 'shaoLian-LH/rollup-ts-template',
    tag: 'v0.0.1'
  },
  'cli': {
    website: 'github',
    address: 'shaoLian-LH/cli',
    tag: 'v0.4.0'
  },
  'vite-antd-tailwind': {
    website: 'github',
    address: 'shaoLian-LH/vite-tailwind-template',
  },
  'vue3-antd-tailwind': {
    website: 'github',
    address: 'shaoLian-LH/vite-tailwind-template',
  },
  'vue3-element-tailwind': {
    website: 'github',
    address: 'cloudhao1999/cloud-app-admin',
  }
}

const presetList = Object.keys(projectPresets).join(', ')

export { 
  projectPresets,
  presetList
}