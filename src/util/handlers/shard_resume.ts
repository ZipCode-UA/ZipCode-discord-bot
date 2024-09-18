import { Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ShardResume,
    handlerFactory(client, checkPerms) {
        return async (id: number, eventsReplayed: number) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;