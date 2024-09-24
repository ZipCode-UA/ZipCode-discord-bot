import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("colorme")
        .setDescription("Gives your name a color!")
        .addIntegerOption(option =>
            option.setName("red")
                .setMinValue(0)
                .setMaxValue(255)
                .setRequired(true)
        ).addIntegerOption(option =>
            option.setName("green")
                .setMinValue(0)
                .setMaxValue(255)
                .setRequired(true)
        ).addIntegerOption(option =>
            option.setName("blue")
                .setMinValue(0)
                .setMaxValue(255)
                .setRequired(true)
        ) as SlashCommandBuilder,
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        
    },
    permissions: ICommandPermission.ALL,
}

export default command;