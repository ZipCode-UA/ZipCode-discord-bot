import { Events, Sticker } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildStickerDelete,
    handlerFactory(client, checkPerms) {
        return async (sticker: Sticker) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;