import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { IModal } from "../types/discord_interactions";
import { pollBuilder } from "../messages/poll_builder";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";

const customId = "polsprompt" as const;
const promptInputId = "promptin" as const;

const modal: IModal = {
    customId: customId,
    execute: async (interaction, idArgs) => {
        await interaction.deferReply({ ephemeral: true });
        const newTitle = interaction.fields.getTextInputValue(promptInputId);
        const pollNick = idArgs[1];
        const embed = interaction.message?.embeds[0];
        if (!embed) {
            await interaction.editReply({ content: "Failed to update poll" });
            logger.log(`Unable to fetch poll embed data`, LogTarget.Error, "PollSetPromptModal");
            return;
        }
        const currentResponses = embed.fields.map((resField) => {
            return { id: resField.name.charAt(1), response: resField.value };
        }).filter((tuple) => tuple.id != "B");
        const pBuilder = pollBuilder(pollNick, {
            title: newTitle,
            responses: currentResponses.length == 0 ? undefined : currentResponses.map((tuple) => tuple.response)
        });
        await interaction.message?.edit(pBuilder);
        await interaction.deleteReply();
    },
    modal: (nickname: string) => {
        let comps = new ActionRowBuilder<TextInputBuilder>()
            .setComponents([new TextInputBuilder()
                .setCustomId(promptInputId)
                .setLabel("New Prompt")
                .setPlaceholder("Enter prompt")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
            ]);

        return new ModalBuilder()
            .setTitle('Set Poll Prompt')
            .setCustomId(`${customId}:${nickname}`)
            .addComponents(comps)

    }
}

export default modal;