import { Events, GuildChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ChannelCreate,
    handlerFactory(client, checkPerms) {
        return async (channel: GuildChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;