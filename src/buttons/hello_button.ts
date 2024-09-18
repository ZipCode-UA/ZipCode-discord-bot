import { ButtonBuilder, ButtonStyle } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";

const customId = 'hello'

const button: IButton = {
  customId: customId,
  execute: async (interaction, idArgs) => {
    await interaction.reply({content:"You pressed a button!"});
  },
  permissions: ICommandPermission.ALL,
  button: () => {
    return new ButtonBuilder()
      .setCustomId(customId)
      .setStyle(ButtonStyle.Primary)
      .setLabel("Hello");
  }
}

export default button;