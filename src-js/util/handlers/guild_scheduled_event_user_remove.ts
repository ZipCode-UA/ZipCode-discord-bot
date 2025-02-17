import { Events, GuildScheduledEvent, User } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildScheduledEventUserRemove,
    handlerFactory(client, checkPerms) {
        return async (event: GuildScheduledEvent, user: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;