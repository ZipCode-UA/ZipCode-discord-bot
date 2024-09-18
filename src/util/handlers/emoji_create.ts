import { Events, GuildEmoji } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildEmojiCreate,
    handlerFactory(client, checkPerms) {
        return async (emoji: GuildEmoji) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;