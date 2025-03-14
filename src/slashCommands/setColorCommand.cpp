#include <dpp/cache.h>
#include <dpp/coro/async.h>
#include <dpp/dpp.h>
#include "SetColorCommand.h"
#include "DiscordBot.h"


namespace SetColorCommand {
    dpp::task<void> setColorCommand(const dpp::slashcommand_t &event) {
        dpp::cluster *bot = ZipCode::DiscordBot::getInstance()->getCluster();

        if (event.command.get_command_name() != "set-color") co_return;

        std::string colorStr = event.command.
            get_command_interaction().
            get_value<std::string>(0);

        dpp::guild_member user = dpp::find_guild_member(event.command.guild_id,
                                                         event.command.usr.id);
        dpp::role role;
		role.set_name("null");

        const dpp::confirmation_callback_t guildRolesConfirmation = co_await bot->co_roles_get(event.command.guild_id);

        if (guildRolesConfirmation.is_error()) {
            co_await event.co_reply("Error: Could not retrieve server's roles because " + guildRolesConfirmation.get_error().human_readable);
            co_return;
        }

        const dpp::role_map guildRoles = guildRolesConfirmation.get<dpp::role_map>();

        for (const auto &guildRole : guildRoles) {
			dpp::role role_copy = *dpp::find_role(guildRole.first);	
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
            co_await event.co_reply("Error: Invalid length for hex code. Do not include an alpha channel");
            co_return;
        }
        
        uint32_t color = std::stoi(colorStr, nullptr, 16);

        role.set_color(color);

        bool wait = true;

        if (roleExisted) {
            const dpp::confirmation_callback_t roleEditConfirmation = co_await bot->co_role_edit(role);

            if (roleEditConfirmation.is_error()) {
                co_await event.co_reply("Error: Couldn't edit your role because " + roleEditConfirmation.get_error().human_readable);
                co_return;
            }
            
        } else {
            role.set_guild_id(event.command.guild_id);
            role.set_name(user.user_id.str());
            bot->role_create(role, [&role, &wait](const dpp::confirmation_callback_t &ev) {
                if (!ev.is_error()) {
                    role = std::get<dpp::role>(ev.value);
                }

                wait = false;
            });

            while (wait) {}

            user = user.add_role(role.id);

            const auto guildMemberEditConfirmation = co_await bot->co_guild_edit_member(user);   

            if (guildMemberEditConfirmation.is_error()) {
                co_await event.co_reply("Error: Could not add role to you because " + guildMemberEditConfirmation.get_error().human_readable);
                co_return;
            }
        }

        co_await event.co_reply("Successfully changed your color");
    }
}
