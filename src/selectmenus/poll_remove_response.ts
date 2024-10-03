import { StringSelectMenuBuilder } from "discord.js";
import { ICommandPermission, ISelectMenu } from "../types/discord_interactions";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";
import { pollBuilder } from "../messages/poll_builder";

const customId = "polremres" as const;
const selectmenu: ISelectMenu = {
    customId: customId,
    execute: async (interaction, idArgs) => {
        await interaction.deferReply({ ephemeral: true });
        if (!interaction.isStringSelectMenu()) return; // TODO: Add error checks
        const pollId = idArgs[1];
        const responseId = interaction.values[0];
        const embed = interaction.message.embeds[0];
        if (!embed) {
            await interaction.editReply({ content: "Failed to update poll" });
            logger.log(`Unable to fetch poll embed data`, LogTarget.Error, "PollDeleteResponseSelect");
            return;
        }
        const currentTitle = embed.title?.substring(0, embed.title?.length - (12 + pollId.length));
        const currentResponses = embed.fields.map((resField) => {
            return { id: resField.name.charAt(1), response: resField.value };
        }).filter((tuple) => tuple.id != "B").sort((a, b) => parseInt(a.id) - parseInt(b.id)) || [];
        const spliceTarget = parseInt(responseId) - 1;

        currentResponses.splice(spliceTarget, 1);
        const pBuilder = pollBuilder(pollId, {
            title: currentTitle,
            responses: currentResponses.length == 0 ? undefined : currentResponses.map((tuple) => tuple.response),
        });
        await interaction.message.edit(pBuilder);
        await interaction.editReply({ content: `Removed response ${spliceTarget + 1} (index ${spliceTarget})` });
    },
    selectMenu(pollNick: string, options: { label: string, value: string, emoji: never, description: never, default: never }[]) {
        return new StringSelectMenuBuilder()
            .setCustomId(`${customId}:${pollNick}`)
            .setOptions(options)
            .setPlaceholder("Choose the identifier corresponding to the response to remove");
    },
    permissions: ICommandPermission.SERVER_OWNER,
}

export default selectmenu;