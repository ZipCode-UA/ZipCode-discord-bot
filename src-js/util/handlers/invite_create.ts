import { Events, Invite } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.InviteCreate,
    handlerFactory(client, checkPerms) {
        return async (invite: Invite) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;