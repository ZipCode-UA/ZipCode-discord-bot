import { ActionRowBuilder, ButtonBuilder, ChannelSelectMenuBuilder, ChannelType, Poll, PollLayoutType } from "discord.js";
import { ICommandPermission, ISelectMenu } from "../types/discord_interactions";
import { instance as logger } from "../util/logger/logger";
import { LogTarget } from "../types/logging";
import { fsPollManager } from "../util/firebase/firestore/poll";
import endPollBtn from "../buttons/poll_end";

const customId = "polpblsh" as const;
const selectmenu: ISelectMenu = {
    customId: customId,
    execute: async (interaction, idArgs) => {
        if (!interaction.isChannelSelectMenu()) {
            await interaction.reply({ ephemeral: true, content: "Invalid interaction type" });
            logger.log("Invalid interaction type received", LogTarget.Error, "PollPublishSelect");
            return;
        }
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.channels.first();
        if (!channel || (channel.type != ChannelType.GuildText && channel.type != ChannelType.GuildAnnouncement)) {
            await interaction.editReply({ content: "An invalid channel was selected!" });
            logger.log("Invalid channel selected", LogTarget.Error, "PollPublishSelect");
            return;
        }

        const poll = await fsPollManager.getPoll(idArgs[1]);
        if (!poll) {
            await interaction.editReply({ content: "Could not fetch the poll to publish" });
            logger.log("Could not fetch poll from firestore", LogTarget.Error, "PollPublishSelect");
            return;
        }
        const message = await interaction.guild?.channels.fetch(poll.channelId).then(async (channel) => {
            if (!channel?.isSendable()) {
                return;
            }
            return channel.messages.fetch(poll.messageId);
        });
        if (!message) {
            await interaction.editReply({ content: "Failed to fetch poll builder message" });
            logger.log("Failed to fetch poll builder message", LogTarget.Error, "PollPublishSelect");
            return;
        }
        const embed = message.embeds[0];
        if (!embed) {
            await interaction.editReply({ content: "Failed to fetch pollbuilder embed" });
            logger.log("Failed to fetch pollbuilder embed", LogTarget.Error, "PollPublishSelect");
            return;
        }

        // poll: {
        //     question: { text: 'What is your favorite color?' },
        //     answers: [
        //       { text: 'Red', emoji: '🟥' },
        //       { text: 'Green', emoji: '🟩' },
        //       { text: 'Blue', emoji: '🟦' },
        //     ],
        //     allowMultiselect: false,
        //     duration: 2,
        //     layoutType: PollLayoutType.Default,
        //   },
        const discordPoll: { question:{text:string},answers:{text:string}[],allowMultiselect:boolean,duration:number,layoutType:PollLayoutType } = {
            question: { text: embed.title?.substring(0, embed.title.length - (12 + idArgs[1].length)) || "" },
            answers: embed.fields.map(field => {
                    return { text: field.value }; 
                }),
            allowMultiselect: true,
            duration: 24,
            layoutType: PollLayoutType.Default,
        }
        const pollChannel = await interaction.guild?.channels.fetch(channel.id);
        if (!pollChannel?.isSendable()) {
            await interaction.editReply({ content: "An invalid channel was selected!" });
            logger.log("Invalid channel selected - not sendable", LogTarget.Error, "PollPublishSelect");
            return;
        }
        const newMessage = await pollChannel.send({ poll: discordPoll, components: [new ActionRowBuilder<ButtonBuilder>().addComponents(endPollBtn.button(poll.nickname))] });
        await fsPollManager.updatePoll(poll.nickname, newMessage.id, newMessage.channelId, "closed");
        await message.delete();
        await interaction.editReply({ content: "The poll should be published now!" });

    },
    selectMenu: (pollNick: string) => {
        return new ChannelSelectMenuBuilder()
            .addChannelTypes([ChannelType.GuildText, ChannelType.GuildAnnouncement])
            .setCustomId(`${customId}:${pollNick}`)
            .setMaxValues(1)
            .setPlaceholder("Choose channel to publish to")
    },
    permissions: ICommandPermission.SERVER_OWNER,
}

export default selectmenu;