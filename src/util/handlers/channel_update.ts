import { DMChannel, Events, GuildChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ChannelUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldChannel: GuildChannel | DMChannel, newChannel: GuildChannel | DMChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;