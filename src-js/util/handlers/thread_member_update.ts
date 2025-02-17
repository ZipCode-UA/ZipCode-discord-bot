import { Events, ThreadMember } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ThreadMemberUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldMember: ThreadMember, newMember: ThreadMember) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;