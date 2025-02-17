import { Events, Role } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildRoleCreate,
    handlerFactory(client, checkPerms) {
        return async (role: Role) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;