import { ButtonBuilder, ButtonStyle } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";
import { fsPollManager } from "../util/firebase/firestore/poll";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";
import setResponseModal from "../modals/poll_set_response";

const customId = "polresadd" as const;

const button: IButton = {
    customId: customId,
    execute: async (interaction, idArgs) => {
        const pollId = idArgs[1];
        const poll = await fsPollManager.getPoll(pollId);
        if (!poll) {
            await interaction.editReply({ content: `There is no poll with id ${pollId}. If this was used from a poll builder message, report to a bot developer.`});
            logger.log(`Button ${customId}:${pollId} appears to be broken (unable to retrieve poll on backend)`, LogTarget.Error, "PollAddResponseButton");
            return;
        }
        await interaction.showModal(setResponseModal.modal(pollId, "-1"));
    },
    button: (pollNick: string) => {
        return new ButtonBuilder()
            .setCustomId(`${customId}:${pollNick}`)
            .setLabel("Add Response")
            .setStyle(ButtonStyle.Success);
    },
    permissions: ICommandPermission.SERVER_OWNER
}

export default button;