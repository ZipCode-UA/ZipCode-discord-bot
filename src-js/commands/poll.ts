import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { pollBuilder } from "../messages/poll_builder";

async function createPoll(interaction: ChatInputCommandInteraction) {
    const nickname = interaction.options.getString("nickname", true).toLowerCase();
    const channel = interaction.channel;
    if (channel && channel.isSendable()) {
        const message = await channel.send({ content: `Initializing poll ${nickname}...` });
        await fsPollManager.addPoll(message.id, channel.id, nickname);
        const pBuilder = pollBuilder(nickname);
        await message.edit(pBuilder);
    }
}

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Commands that control club polls")
        .addSubcommand(subcmd =>
            subcmd.setName("create")
                .setDescription("Creates a new empty poll.")
                .addStringOption(option =>
                    option.setName("nickname")
                        .setDescription("A nickname to identify the poll by. Must be 7 characters or less and lowercase a-z")
                        .setRequired(true)
                        .setMinLength(1)
                        .setMaxLength(7)
                    )
        ) as SlashCommandBuilder,
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: false });
        if (interaction.options.getSubcommand(false) == "create") {
            await createPoll(interaction);
        }
        await interaction.deleteReply();
    },
    permissions: ICommandPermission.SERVER_OWNER
}

export default command;