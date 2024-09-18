import { Client, Events, VoiceState } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.Warn,
    handlerFactory(client, checkPerms) {
        return async (oldState: VoiceState, newState: VoiceState) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;