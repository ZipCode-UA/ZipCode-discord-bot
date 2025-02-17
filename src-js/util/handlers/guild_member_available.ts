import { Events, GuildMember } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildMemberAvailable,
    handlerFactory(client, checkPerms) {
        return async (member: GuildMember) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;