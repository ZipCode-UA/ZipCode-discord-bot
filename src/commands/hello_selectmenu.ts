import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";
import HelloSelectMenu from "../selectmenus/hello_selectmenu";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('helloselect')
        .setDescription('Sends a hello select menu'),
    execute: async (interaction) => {
        await interaction.reply({content: "Make a choice!", components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(HelloSelectMenu.selectMenu() as StringSelectMenuBuilder)]});
    },
    permissions: ICommandPermission.ALL
}

export default command;