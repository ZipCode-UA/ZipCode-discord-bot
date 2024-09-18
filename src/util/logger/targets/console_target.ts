import { ILogTarget, LogTarget } from "../../../types/logging";

const target: ILogTarget = {
    message: async (message, target, system) => {
        const logDate = new Date(Date.now());
        console.log(`[${target} ${system ? `| ${system} ` : ""}| ${logDate.getMonth()+1}-${logDate.getDate()+1}-${logDate.getFullYear()} | ${logDate.getHours()}:${logDate.getMinutes()}]: ${message}`);
    },
    targets: [LogTarget.Info, LogTarget.Error, LogTarget.Warn]
}