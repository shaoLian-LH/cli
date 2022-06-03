import { Color } from 'ora';
export interface IWrapOptions {
    color?: Color;
    success?: string | undefined;
    failed?: string | undefined;
}
export declare const wrapLoading: (func: () => void, msg?: string, options?: IWrapOptions) => Promise<unknown>;
