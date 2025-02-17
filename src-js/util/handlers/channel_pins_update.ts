import { Events, TextBasedChannel } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ChannelPinsUpdate,
    handlerFactory(client, checkPerms) {
        return async (channel: TextBasedChannel, time: Date) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;