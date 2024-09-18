import { AutoModerationActionExecution, Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.AutoModerationActionExecution,
    handlerFactory(client, checkPerms) {
        return async (actionExecution: AutoModerationActionExecution) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;