import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { IModal } from "../types/discord_interactions";

const testModal: IModal = {
  customId: "testmodal",
  execute: async (interaction, idArgs) => {
    await interaction.reply({content: `You submitted "${interaction.fields.getTextInputValue("testtextinput")}"`});
  },
  modal: () => {
    let comps = new ActionRowBuilder<TextInputBuilder>()
      .setComponents([new TextInputBuilder()
      .setCustomId('testtextinput')
      .setLabel('Test Text Input')
      .setPlaceholder('Enter some text')
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
    ]);

    return new ModalBuilder()
      .setTitle('Test')
      .setCustomId('testmodal')
      .addComponents(comps)
        
  }
}
