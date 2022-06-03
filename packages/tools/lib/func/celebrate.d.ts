interface ICelebrate {
    awakeVSCode: boolean;
    packageManager: string | undefined;
}
export declare const celebrate: (project: string, { awakeVSCode, packageManager }?: ICelebrate) => void;
export {};
