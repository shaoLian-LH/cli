export declare type projectChoices = 'rollup' | 'vite-antd-tailwind' | 'vue3-antd-tailwind' | 'vue3-element-tailwind';
interface ITag {
    list: Array<string>;
    default: string;
}
export interface IProjectPreset {
    website: string;
    address: string;
    tag?: ITag;
}
declare const projectPresets: Record<string, IProjectPreset>;
declare const presetList: string;
export { projectPresets, presetList };
