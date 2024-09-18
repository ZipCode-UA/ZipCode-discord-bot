import { ActivityType, Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";
import { instance as logger } from "../logger/logger";
import { LogTarget } from "../../types/logging";

const eventHandler: IDiscordEventHandler = {
    event: Events.ClientReady,
    handlerFactory: (client) => {
        return async () => {
            client.user?.setActivity("over your Discord server!", {
                type: ActivityType.Watching,
            });
            logger.log("Startup complete. Bot online.", LogTarget.Info, "Bot");
        }
    },
    useHandler: true,
}

export default eventHandler;