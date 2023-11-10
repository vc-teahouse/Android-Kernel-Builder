export interface KernelSource {
    name: string;
    repo: string;
    branch: string;
    device: string;
    defconfig: string;
}

export interface ExternalCommand {
    [key: string]: string;
}

export interface RepoToolchain {
    name: string;
    repo: string;
    branch: string;
    binPath: string[];
}

export interface DownloadToolchain {
    name: string;
    url: string;
    binPath: string[];
}

export type Toolchain = RepoToolchain | DownloadToolchain;

export interface Params {
    ARCH: string;
    CC: string;
    externalCommand: ExternalCommand;
}

export interface AnyKernel3 {
    use: boolean;
    release: boolean;
    repo: string;
    branch: string;
}

export interface Template {
    kernelSource: KernelSource;
    withKernelSU: boolean;
    toolchains: Toolchain[];
    ccache: boolean;
    params: Params;
    AnyKernel3: AnyKernel3;
}
