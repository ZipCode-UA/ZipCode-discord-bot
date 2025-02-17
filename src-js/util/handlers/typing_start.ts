import { Events, Typing } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.TypingStart,
    handlerFactory(client, checkPerms) {
        return async (typing: Typing) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;