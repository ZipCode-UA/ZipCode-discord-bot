import { Collection, Events, Snowflake, ThreadChannel, ThreadMember } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ThreadMembersUpdate,
    handlerFactory(client, checkPerms) {
        return async (addedMembers: Collection<Snowflake, ThreadMember>, removedMembers: Collection<Snowflake, ThreadMember>, thread: ThreadChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;