import { ICommandPermission } from "../../../types/discord_interactions";
import { IPermission } from "../permissions";

const JACK_ID = "255833990575947777" as const;

const perm: IPermission = {
    permLevel: ICommandPermission.BOT_OWNER,
    permCheck: async (interaction) => {
        return interaction.user.id == JACK_ID;
    }
}

export default perm;