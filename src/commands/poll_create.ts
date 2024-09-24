import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Commands that control club polls")
        .addSubcommand(subcmd => 
            subcmd.setName("create")
                .setDescription("Creates a new empty poll.")
        ) as SlashCommandBuilder,
    execute: async (interaction) => {

    },
    permissions: ICommandPermission.SERVER_OWNER
}