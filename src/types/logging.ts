export type LogRecipient = (message: string, target: string, system?: string) => Promise<void>

const FALLBACK_TARGET = "__FALLBACK__" as const;
export type ILogTarget = {
    message: LogRecipient,
    targets: TypeOfLogTarget[],
}

export enum LogTarget {
    Info="Info",
    Warn="Warn",
    Error="Error",
}

export type TypeOfLogTarget = LogTarget | typeof FALLBACK_TARGET;

export const fallback = () => FALLBACK_TARGET;