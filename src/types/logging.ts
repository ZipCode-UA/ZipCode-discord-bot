export type LogRecipient = (message: string, target: string, system?: string) => Promise<void>

const FALLBACK_TARGET = "__FALLBACK__" as const;
export type ILogTarget = {
    message: LogRecipient,
    targets: (LogTarget | typeof FALLBACK_TARGET)[],
}

export enum LogTarget {
    Info="Info",
    Warn="Warn",
    Error="Error",
}

export const fallback = () => FALLBACK_TARGET;