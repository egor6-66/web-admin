export type BuildMode = 'production' | 'development';

export interface IEnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    devServer?: boolean;
}

export interface IBuildPaths {
    static?: string;
    entry: string;
    html: string;
    public: string;
    output: string;
    src: string;
}

interface ISharedConfig {
    eager?: boolean;
    import?: string | false;
    packageName?: string;
    requiredVersion?: string | false;
    shareKey?: string;
    shareScope?: string;
    singleton?: boolean;
    strictVersion?: boolean;
    version?: string | false;
}

interface ISharedObject {
    [index: string]: string | ISharedConfig;
}

export interface IModuleFederations {
    name: string;
    filename: string;
    remotes?: Record<string, string>;
    exposes?: Record<string, string>;
    shared?: (string | ISharedObject)[] | ISharedObject;
    fallback?: Record<string, string>;
}

export interface IDevServer {
    port: number;
    active: boolean;
    proxy?: Array<{ prefix: string; target: string; postfix4prefix?: string; ws?: boolean }>;
}

export interface IManifest extends Record<string, string> {
    name: string;
    displayName: string;
}

export interface IBuildOptions {
    paths: IBuildPaths;
    mode: BuildMode;
    version: string;
    analyzer?: boolean;
    devServer?: IDevServer;
    moduleFederations?: IModuleFederations;
    aliases: Record<string, string>;
    manifest: IManifest;
}
