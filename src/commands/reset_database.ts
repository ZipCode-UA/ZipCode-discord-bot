import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";
import { fsInternalTrackersManager } from "../util/firebase/firestore/internal_trackers";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("resetdb")
        .setDescription("Resets applicable database values to their defaults"),
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        await fsInternalTrackersManager.setDefaults();
        await interaction.editReply({ content: "Database reset." });
    },
    permissions: ICommandPermission.BOT_OWNER,
}

export default command;