import { Collection, Events, GuildTextBasedChannel, Message, Snowflake } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.MessageBulkDelete,
    handlerFactory(client, checkPerms) {
        return async (messages: Collection<Snowflake, Message>, channel: GuildTextBasedChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;