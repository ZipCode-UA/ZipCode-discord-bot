import { StringSelectMenuBuilder } from "discord.js";
import { ICommandPermission, ISelectMenu } from "../types/discord_interactions";

const customId = "helloselect"

const helloSelectMenu: ISelectMenu = {
  customId: customId,
  execute: async (interaction, idArgs) => {
    if (!interaction.isStringSelectMenu()) return;
    let choice = interaction.values[0];
    await interaction.reply({content:`You selected ${choice === "valueone" ? "Option 1" : "Option 2"}`});
  },
  permissions: ICommandPermission.ALL,
  selectMenu: () => {
    return new StringSelectMenuBuilder()
      .setCustomId(customId)
      .setPlaceholder("Choose an option from here")
      .setOptions([
        {label: "Option 1", value: "valueone"},
        {label: "Option 2", value: "valuetwo"}
      ])
  }
}

export default helloSelectMenu;
