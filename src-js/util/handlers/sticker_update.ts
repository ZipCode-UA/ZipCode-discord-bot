import { Events, Sticker } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildStickerUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldSticker: Sticker, newSticker: Sticker) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;