import { LogTarget } from "../../../types/logging";
import { IStartupEvent } from "../../../types/startup";
import { fsInternalTrackersManager } from "../../firebase/firestore/internal_trackers";
import { instance as logger } from "../../logger/logger";


const event: IStartupEvent = {
    event: "firestore_trackers_cache",
    critical: true,
    runner: async () => {
        return new Promise(async (resolve) => {
            logger.log("Checking Firestore connection", LogTarget.Info, "FirestoreConnect")
            const result = await fsInternalTrackersManager.connected();
            logger.log(`Firestore is ${result ? "connected" : "not connected"}.`, LogTarget.Info, "FirestoreConnect");
            resolve(result);
        });
    },
    useEvent: true,
}

export default event;