import { Events, StageInstance } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.StageInstanceUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldStageInstance: StageInstance|undefined, newStageInstance: StageInstance) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;