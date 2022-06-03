import chalk from 'chalk';
import { exit } from '../func/exit.js';
class Logger {
    _dyeing(contents, color) {
        let content = contents;
        if (Array.isArray(contents)) {
            content = content.map(arg => {
                if (typeof arg === 'string') {
                    return chalk[color](arg);
                }
                return arg;
            });
        }
        return content;
    }
    log(...args) {
        console.log(...args);
    }
    info(...args) {
        console.log(...this._dyeing([...args], 'blue'));
    }
    error(...args) {
        console.log(...this._dyeing([...args], 'red'));
    }
    warn(...args) {
        console.log(...this._dyeing([...args], 'yellow'));
    }
}
export const log = function (...args) {
    new Logger().log(...args);
};
export const info = function (...args) {
    new Logger().info(...args);
};
export const error = function (...args) {
    new Logger().error(...args);
};
export const exitWithError = function (...args) {
    new Logger().error(...args);
    exit(0);
};
export const warn = function (...args) {
    new Logger().warn(...args);
};
