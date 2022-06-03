import semver from 'semver';
import { error, info } from '../service/Logger.js';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { exit } from './exit.js';
export const checkNodeVersion = (requiredVersion, command) => {
    if (!semver.satisfies(process.version, requiredVersion, { includePrerelease: true })) {
        error(`当前命令 ${command} 需要在 ${requiredVersion} 版本下执行，
但当前环境为 Node ${process.version}
请进行调整`);
        exit(1);
    }
};
export const checkNewCliVersion = (curVersion) => {
    const res = execSync('npm show @slfk/cli version', { encoding: 'utf-8' }).replace('\n', '');
    if (semver.gt(res, curVersion)) {
        const splitContent = '───────────────';
        const split = '─';
        const wrapperHeaderContent = `╭${splitContent}${splitContent}${split.repeat(res.length)}${splitContent}${splitContent}╮`;
        const wrapperFooterContent = `╰${splitContent}${splitContent}${split.repeat(res.length)}${splitContent}${splitContent}╯`;
        info(`
  ${wrapperHeaderContent}
  │${splitContent}        新版本 ${chalk.green(res)} 已发布        ${splitContent}│
  │${splitContent} 请运行 ${chalk.green(`npm i -g @slfk/cli`)} 进行更新${splitContent}│
  ${wrapperFooterContent}\n`);
    }
};
