import { Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ShardDisconnect,
    handlerFactory(client, checkPerms) {
        return async (event: CloseEvent, id: number) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;