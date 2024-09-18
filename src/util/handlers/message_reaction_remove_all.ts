import { Collection, Events, Message, MessageReaction, Snowflake } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageReactionRemoveAll,
    handlerFactory(client, checkPerms) {
        return async (message: Message, reactions: Collection<string|Snowflake, MessageReaction>) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;