import { ActionRowBuilder, ButtonBuilder, ChannelSelectMenuBuilder, EmbedBuilder } from "discord.js";
import addResBtn from "../buttons/poll_add_response";
import setPromptBtn from "../buttons/poll_set_prompt";
import publishPollSelect from "../selectmenus/poll_publish";

type PollBuilderOptions = {
    title?: string,
    responses?: string[],

}

export function pollBuilder(nickname: string, options?: PollBuilderOptions) {
    const components = [
        new ActionRowBuilder<ButtonBuilder>()
            .setComponents([
                addResBtn.button(nickname),
                setPromptBtn.button(nickname),
            ]),
        new ActionRowBuilder<ChannelSelectMenuBuilder>()
            .setComponents([
                publishPollSelect.selectMenu(nickname) as ChannelSelectMenuBuilder,
            ]),
    ];
    const embed = new EmbedBuilder()
        .setTitle(`${options?.title ? options.title : "Blank Prompt"} (Nickname:${nickname})`)
        .addFields(options?.responses?.map((res, i) => {
            return { name: `[${i + 1}]`, value: res };
        }) || [{ name: "[Blank]", value: "Responses will show up here when added!" }])
        .setDescription("Use the components attached to this message to build then publish your poll!");
    return {
        content: "",
        embeds: [embed],
        components: components,
    };
}