import { Events, GuildScheduledEvent } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildScheduledEventUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;