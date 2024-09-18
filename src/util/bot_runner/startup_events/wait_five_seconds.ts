import { LogTarget } from "../../../types/logging";
import { IStartupEvent } from "../../../types/startup";
import { instance as logger } from "../../logger/logger";

const event: IStartupEvent = {
    event: "wait_five_seconds",
    critical: false,
    runner: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                logger.log("waited 5 seconds!", LogTarget.Info, "Wait5Sec");
                resolve(true);
            }, 5000);
        })
    },
    useEvent: true,
}

export default event;