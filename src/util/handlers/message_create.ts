import { Events, Message } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageCreate,
    handlerFactory(client, checkPerms) {
        return async (message: Message) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;