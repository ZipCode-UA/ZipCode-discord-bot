import { Events, Message } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldMessage: Message, newMessage: Message) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;