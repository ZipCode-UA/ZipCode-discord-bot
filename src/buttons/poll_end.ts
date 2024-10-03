import { ButtonBuilder } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";

const customId = "polend" as const;
const button: IButton = {
    customId: customId,
    execute: async (interaction, idArgs) => {

    },
    button: () => {
        return new ButtonBuilder();
    },
    permissions: ICommandPermission.SERVER_OWNER,
}