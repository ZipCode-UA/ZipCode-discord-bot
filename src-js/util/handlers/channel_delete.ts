import { DMChannel, Events, GuildChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ChannelDelete,
    handlerFactory(client, checkPerms) {
        return async (channel: GuildChannel | DMChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;