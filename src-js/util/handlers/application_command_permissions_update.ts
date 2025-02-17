import { ApplicationCommandPermissionsUpdateData, Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ApplicationCommandPermissionsUpdate,
    handlerFactory(client, checkPerms) {
        return async (permUpdate: ApplicationCommandPermissionsUpdateData) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;