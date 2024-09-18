import { Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.Warn,
    handlerFactory(client, checkPerms) {
        return async (info: string) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;