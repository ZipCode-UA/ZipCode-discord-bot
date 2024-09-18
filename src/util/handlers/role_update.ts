import { Events, Role } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildRoleUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldRole: Role, newRole: Role) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;