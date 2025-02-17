import { Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ShardError,
    handlerFactory(client, checkPerms) {
        return async (error: Error, shardId: number) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;