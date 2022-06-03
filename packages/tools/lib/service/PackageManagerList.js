import { execSync } from 'child_process';
const versionRegex = /d*.d*.d*/;
export const execCmd = (cmd) => {
    try {
        return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' }).match(versionRegex);
    }
    catch (e) {
        return false;
    }
};
export const getPackageManagerList = () => {
    return [{
            tool: 'yarn',
            cmd: 'yarn -v'
        }, {
            tool: 'npm',
            cmd: 'npm -v'
        }, {
            tool: 'pnpm',
            cmd: 'pnpm -v'
        }]
        .map(setting => execCmd(setting.cmd) ? setting.tool : undefined)
        .filter(valid => valid);
};
