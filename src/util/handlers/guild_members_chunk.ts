import { Collection, Events, GatewayGuildMembersChunkDispatchData, Guild, GuildMember, Snowflake } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.GuildMembersChunk,
    handlerFactory(client, checkPerms) {
        return async (members: Collection<Snowflake, GuildMember>, guild: Guild, chunk: GatewayGuildMembersChunkDispatchData) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;