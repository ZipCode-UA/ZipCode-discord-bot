import { Collection, Events, Guild, Snowflake, ThreadChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ThreadListSync,
    handlerFactory(client, checkPerms) {
        return async (threads: Collection<Snowflake, ThreadChannel>, guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;