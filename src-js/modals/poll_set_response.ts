import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { IModal } from "../types/discord_interactions";
import { pollBuilder } from "../messages/poll_builder";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";

const customId = "polsetres" as const;
const responseInputId = "polres" as const;

const modal: IModal = {
  customId: customId,
  execute: async (interaction, idArgs) => {
    await interaction.deferReply({ ephemeral: true });
    const res = interaction.fields.getTextInputValue(responseInputId);
    const pollNick = idArgs[1];
    const responseId = idArgs[2];

    const embed = interaction.message?.embeds[0];
    if (!embed) {
      await interaction.editReply({ content: "Failed to update poll" });
      logger.log(`Unable to fetch poll embed data`, LogTarget.Error, "PollSetResponseModal");
      return;
    }
    const currentTitle = embed.title?.substring(0, embed.title?.length - (12 + pollNick.length));
    const currentResponses = embed.fields.map((resField) => {
      return { id: resField.name.charAt(1), response: resField.value };
    }).filter((tuple) => tuple.id != "B").sort((a, b) => parseInt(a.id) - parseInt(b.id)) || [];

    let targetIndex = -1;
    for (let i = 0; i < currentResponses.length; i++) {
      if (currentResponses[i].id == responseId) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex == -1) {
      currentResponses.push({ id: `${currentResponses.length}`, response: res});
    } else {
      currentResponses[targetIndex].response = res;
    }

    const pBuilder = pollBuilder(pollNick, {
      title: currentTitle,
      responses: currentResponses.map((tuple) => tuple.response),
    });

    await interaction.message?.edit(pBuilder);
    await interaction.deleteReply();
  },
  modal: (nickname: string, responseId: string) => {
    let comps = new ActionRowBuilder<TextInputBuilder>()
      .setComponents([new TextInputBuilder()
        .setCustomId(responseInputId)
        .setLabel("Response")
        .setPlaceholder("Enter response")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
      ]);

    return new ModalBuilder()
      .setTitle('Set Poll Response')
      .setCustomId(`${customId}:${nickname}:${responseId}`)
      .addComponents(comps)

  }
}

export default modal;