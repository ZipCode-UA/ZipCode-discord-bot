import { Events, GuildEmoji } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildEmojiUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;