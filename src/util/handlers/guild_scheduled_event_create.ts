import { Events, GuildScheduledEvent } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildScheduledEventCreate,
    handlerFactory(client, checkPerms) {
        return async (event: GuildScheduledEvent) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;