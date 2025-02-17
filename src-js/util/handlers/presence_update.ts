import { Events, Presence } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.PresenceUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldPresence: Presence|undefined, newPresence: Presence) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;