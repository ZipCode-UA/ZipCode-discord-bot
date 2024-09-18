import { Client, Collection, Interaction } from "discord.js";
import { IDiscordEventHandler } from "../types/event_handler";
import { readdirSync } from "fs";
import { join } from "path"
import { ICommandPermission } from "../types/discord_interactions";
import { instance as logger } from "./logger/logger";
import { LogTarget } from "../types/logging";


export const setEventHandlers = (client: Client, checkPerms?: (permissionLevel: ICommandPermission, interaction: Interaction) => Promise<boolean>) => {

    if (!client) return;

    const eventHandlers = new Collection<String, IDiscordEventHandler>();
    const handlerFiles = readdirSync(join(__dirname, "handlers")).filter(file => file.endsWith(".js"));

    for (const file of handlerFiles) {

        try {
            const handler = require(join(__dirname, `./handlers/${file}`)).default as IDiscordEventHandler;
            if (!handler.useHandler) continue;
            const onEvent = handler.handlerFactory(client, checkPerms);
            logger.log(`Reading event handler for ${handler.event}.`, LogTarget.Info, "Handlers");
            client.on(handler.event.toString(), onEvent);
        } catch (error) {
            logger.log(`Error in file ${file}`, LogTarget.Error, "Handlers");
            continue;
        }
    };

    return eventHandlers;
}