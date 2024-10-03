import { ButtonBuilder, ButtonStyle, Snowflake } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";
import { fsPollManager } from "../util/firebase/firestore/poll";

const customId = "polend" as const;
const button: IButton = {
    customId: customId,
    execute: async (interaction, idArgs) => {

        await interaction.deferReply({ ephemeral: true });
        const pollNick = idArgs[1];
        const poll = interaction.message.poll;
        if (!poll) {
            await interaction.editReply({ content: "No poll is attached to this message!" });
        }
        const responses = new Map<string, Snowflake[]>();
        poll?.answers.forEach(async (answer) => {
            responses.set(answer.text || "", (await answer.fetchVoters()).map(user => {
                return user.id;
            }));
        });
        await poll?.end();
        const databaseResponseWritePromises: Promise<any>[] = [];
        let i = 0;
        responses.forEach((value, key) => {
            databaseResponseWritePromises.push(fsPollManager.addPollResult(pollNick, key, value, 0+i));
            i++;
        });
        await Promise.all(databaseResponseWritePromises);
        await interaction.message.delete();
        await interaction.editReply({ content: "Poll ended!" });

    },
    button: (pollNick: string) => {
        return new ButtonBuilder()
            .setLabel("End Poll")
            .setCustomId(`${customId}:${pollNick}`)
            .setStyle(ButtonStyle.Danger);
    },
    permissions: ICommandPermission.SERVER_OWNER,
}

export default button;