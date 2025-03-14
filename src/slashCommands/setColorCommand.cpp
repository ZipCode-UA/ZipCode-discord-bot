#include <dpp/cache.h>
#include <dpp/dpp.h>
#include "SetColorCommand.h"
#include "DiscordBot.h"


namespace SetColorCommand {
    void setColorCommand(const dpp::slashcommand_t &event) {
        dpp::cluster *bot = ZipCode::DiscordBot::getInstance()->getCluster();

        if (event.command.get_command_name() != "set-color") return;

        std::string colorStr = event.command.
            get_command_interaction().
            get_value<std::string>(0);

        dpp::guild guild = event.command.get_guild();

        dpp::guild_member user = dpp::find_guild_member(event.command.guild_id,
                                                         event.command.usr.id);
        dpp::role role;
		role.set_name("null");

        for (const auto &roleSnowflake : guild.roles) {
			const dpp::role role_copy = *dpp::find_role(roleSnowflake);	
            if (role_copy.name == user.user_id.str()) {
				role = role_copy;
                break;
            }
        }

        bool roleExisted = role.name != "null";
        
        if (colorStr.starts_with('#')) {
            colorStr = colorStr.substr(1);
        }

        if (colorStr.length() != 6) {
            event.reply("Error: Invalid length for hex code. Do not include an alpha channel");
            return;
        }
        
        uint32_t color = std::stoi(colorStr, nullptr, 16);

        role.set_color(color);

        bool wait = true;

        if (roleExisted) {
            bot->role_edit(role);
        } else {
            role.set_guild_id(guild.id);
            role.set_name(user.user_id.str());
            bot->role_create(role, [&role, &wait](const dpp::confirmation_callback_t &ev) {
                if (!ev.is_error()) {
                    role = std::get<dpp::role>(ev.value);
                }

                wait = false;
            });

            while (wait) {}
        }

        user = user.add_role(role.id);

        std::string err = "";

        bot->guild_edit_member(user, [&err](const dpp::confirmation_callback_t &ev) {
            if (ev.is_error()) {
                err = ev.get_error().human_readable;
            }
        });

        if (err != "") {
            event.reply("Failed to update your color because: " + err);
        } else {
            event.reply("Your color has been updated!");
        }
    }
}
