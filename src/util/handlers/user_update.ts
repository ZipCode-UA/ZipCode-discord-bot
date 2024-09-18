import { Events, User } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.UserUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldUser: User, newUser: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;