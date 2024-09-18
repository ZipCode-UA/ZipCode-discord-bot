export type IStartupEvent = {
    event: string,
    critical: boolean,
    runner: (() => Promise<boolean>),
    onFail?: (() => Promise<boolean>),
    useEvent: boolean,
}