import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("colorme")
        .setDescription("Gives your name a color!")
        .addIntegerOption(option =>
            option.setName("red")
                .setDescription("The amount of red in the color")
                .setMinValue(0)
                .setMaxValue(255)
                .setRequired(true)
        ).addIntegerOption(option =>
            option.setName("green")
                .setDescription("The amount of green in the color")
                .setMinValue(0)
                .setMaxValue(255)
                .setRequired(true)
        ).addIntegerOption(option =>
            option.setName("blue")
                .setDescription("The amount of blue in the color")
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