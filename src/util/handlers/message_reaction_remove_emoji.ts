import { Events, MessageReaction } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageReactionRemoveEmoji,
    handlerFactory(client, checkPerms) {
        return async (reaction: MessageReaction) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;