import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";
import HelloButton from "../buttons/hello_button";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('hellobutton')
        .setDescription('Sends a hello button'),
    execute: async (interaction) => {
        await interaction.reply({content: "Press this button!", components: [new ActionRowBuilder<ButtonBuilder>().addComponents(HelloButton.button())]});
    },
    permissions: ICommandPermission.ALL
}

export default command;