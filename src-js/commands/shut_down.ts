import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { exit } from "process";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("shutdown")
        .setDescription("Gracefully disconnects the bot from all services and shuts down."),
    execute: async (interaction) => {
        // TODO: Commit all data
        logger.log("Shutting down", LogTarget.Info);
        await interaction.reply({ content: "Bot shutting down.", ephemeral: true });
        exit(0);
    },
    permissions: ICommandPermission.BOT_OWNER
}

export default command;