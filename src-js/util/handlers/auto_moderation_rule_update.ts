import { AutoModerationRule, Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.AutoModerationRuleUpdate,
    handlerFactory(client, checkPerms) {
        return async (rule: AutoModerationRule) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;