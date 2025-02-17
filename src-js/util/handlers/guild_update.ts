import { Events, Guild } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldGuild: Guild, newGuild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;