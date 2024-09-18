import { Events, Interaction } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.InteractionCreate,
    handlerFactory(client, checkPerms) {
        return async (interaction: Interaction) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;