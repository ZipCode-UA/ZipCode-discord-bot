import { Events, GuildMember } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildMemberUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldMember: GuildMember, newMember: GuildMember) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;