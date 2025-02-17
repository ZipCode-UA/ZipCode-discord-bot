import { Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.Error,
    handlerFactory(client, checkPerms) {
        return (error: Error) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;