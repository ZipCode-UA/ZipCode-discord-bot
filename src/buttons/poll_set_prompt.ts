import { ButtonBuilder, ButtonStyle } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";
import setPromptModal from "../modals/poll_set_prompt";

const customId = "polprompt" as const;

const button: IButton = {
    customId: customId,
    execute: async (interaction, idArgs) => {
        const pollId = idArgs[1];
        const poll = await fsPollManager.getPoll(pollId);
        if (!poll) {
            await interaction.editReply({ content: `There is no poll with id ${pollId}. If this was used from a poll builder message, report to a bot developer.`});
            logger.log(`Button ${customId}:${pollId} appears to be broken (unable to retrieve poll on backend)`, LogTarget.Error, "PollSetPromptButton");
            return;
        }
        await interaction.showModal(setPromptModal.modal(pollId, "-1"));
    },
    button: (pollNick: string) => {
        return new ButtonBuilder()
            .setCustomId(`${customId}:${pollNick}`)
            .setLabel("Set Prompt")
            .setStyle(ButtonStyle.Primary);
    },
    permissions: ICommandPermission.SERVER_OWNER
}

export default button;