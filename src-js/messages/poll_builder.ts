import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ChannelSelectMenuBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import addResBtn from "../buttons/poll_add_response";
import setPromptBtn from "../buttons/poll_set_prompt";
import publishPollSelect from "../selectmenus/poll_publish";
import removeResponseSelect from "../selectmenus/poll_remove_response";

type PollBuilderOptions = {
    title?: string,
    responses?: string[],
}

export function pollBuilder(nickname: string, options?: PollBuilderOptions) {

    const removeSelectOptions = options?.responses?.map((res, i) => {
        return { label: `[${i + 1}]`, value: `${i + 1}` };
    });

    const topButtonRow = new ActionRowBuilder<ButtonBuilder>()
        .setComponents([
            addResBtn.button(nickname),
            setPromptBtn.button(nickname),
        ])
    const publishRow = new ActionRowBuilder<ChannelSelectMenuBuilder>()
        .setComponents([
            publishPollSelect.selectMenu(nickname) as ChannelSelectMenuBuilder,
        ])

    const removeRow = removeSelectOptions ? new ActionRowBuilder<StringSelectMenuBuilder>()
        .setComponents([
            removeResponseSelect.selectMenu(nickname, removeSelectOptions) as StringSelectMenuBuilder,
        ]) : undefined

    const components: (ActionRowBuilder<StringSelectMenuBuilder> | ActionRowBuilder<ChannelSelectMenuBuilder> | ActionRowBuilder<ButtonBuilder>)[] = [
        topButtonRow,
        publishRow,
    ];
    if (removeRow) components.push(removeRow);
    const embedFields = options?.responses?.map((res, i) => {
        return { name: `[${i + 1}]`, value: res };
    });
    const embed = new EmbedBuilder()
        .setTitle(`${options?.title ? options.title : "Blank Prompt"} (Nickname:${nickname})`)
        .addFields(embedFields ? embedFields : [{ name: "[Blank]", value: "Responses will show up here when added!" }])
        .setDescription("Use the components attached to this message to build then publish your poll!");
    return {
        content: "",
        embeds: [embed],
        components: components,
    };
}