import { Events, ThreadChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ThreadUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldThread: ThreadChannel, newThread: ThreadChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;