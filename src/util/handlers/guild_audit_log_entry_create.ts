import { Events, Guild, GuildAuditLogsEntry } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildAuditLogEntryCreate,
    handlerFactory(client, checkPerms) {
        return async (auditLogEntry: GuildAuditLogsEntry, guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;