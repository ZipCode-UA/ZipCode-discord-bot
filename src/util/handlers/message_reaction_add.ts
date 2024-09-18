import { Events, MessageReaction, User } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageReactionAdd,
    handlerFactory(client, checkPerms) {
        return async (reaction: MessageReaction, user: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;