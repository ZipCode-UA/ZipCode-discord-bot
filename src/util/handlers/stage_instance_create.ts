import { Events, StageInstance } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.StageInstanceCreate,
    handlerFactory(client, checkPerms) {
        return async (stageInstance: StageInstance) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;