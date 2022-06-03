import { projectChoices } from '../setting/presets.js';
export interface ITemplate {
    template: projectChoices;
    dir: string;
    projectName: string;
    tag?: string | undefined;
    packageManager: string | undefined;
    wake?: boolean | undefined;
}
declare class Project {
    private _moveToProjectDir;
    private _downloadTemplate;
    private _initGitRepository;
    private _installDependencies;
    createWithTemplate({ template, dir, projectName, tag, packageManager, wake }: ITemplate): Promise<void>;
}
export default Project;
