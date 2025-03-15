#include <dpp/cache.h>
#include <dpp/coro/async.h>
#include <dpp/dpp.h>
#include <stdexcept>
#include "SetColorCommand.h"
#include "DiscordBot.h"


namespace SetColorCommand {
    dpp::task<void> setColorCommand(const dpp::slashcommand_t &event) {
        // true value makes it so only the command caller can see the response
        co_await event.co_thinking(true);

        dpp::cluster *bot = ZipCode::DiscordBot::getInstance()->getCluster();

        // ignore all commands that are not /set-color
        if (event.command.get_command_name() != "set-color") co_return;

        // get the color as a string from discord
        std::string colorStr = event.command.
            get_command_interaction().
            get_value<std::string>(0);

        
        // get the user executing the command as a guild_member
        dpp::guild_member user = dpp::find_guild_member(event.command.guild_id,
                                                         event.command.usr.id);
    
        // define a default role and set it's name to null for checking later
        dpp::role role;
		role.set_name("null");

        // attempt to get all roles from a guild. Give the caller an error on fail
        const dpp::confirmation_callback_t guildRolesConfirmation = co_await bot->co_roles_get(event.command.guild_id);
        if (guildRolesConfirmation.is_error()) {
            co_await event.co_edit_original_response(dpp::message("Error: Could not retrieve server's roles because " + guildRolesConfirmation.get_error().human_readable));
            co_return;
        }

        // loop through all the roles of the guild to find one that matches the caller's UUID
        const dpp::role_map guildRoles = guildRolesConfirmation.get<dpp::role_map>();
        for (const auto &guildRole : guildRoles) {
            // calling dpp:find_role since guildRole->second causes a `guild not found` error
			dpp::role role_copy = *dpp::find_role(guildRole.first);	
            if (role_copy.name == user.user_id.str()) {
				role = role_copy;
                break;
            }
        }

        // check to see if we found a role above or not
        bool roleExisted = role.name != "null";
        
        // remove # from hex value for std::stoi parsing
        if (colorStr.starts_with('#')) {
            colorStr = colorStr.substr(1);
        }

        // check if the hex is a proper length
        if (colorStr.length() != 6) {
            co_await event.co_edit_original_response(dpp::message("Error: Invalid length for hex code. Do not include an alpha channel"));
            co_return;
        }

        std::string err = "";
        uint32_t color;
        
        // attempt to parse the provided hex code
        try {
            color = std::stoi(colorStr, nullptr, 16);
        } catch (const std::invalid_argument &ex) {
            err = "invalid_argument";
        } catch (const std::out_of_range &ex) {
            err = "out_of_range";
        }

        // if the hex code was invalid, tell the user what exception was thrown
        if (err != "") {
            co_await event.co_edit_original_response(dpp::message("Error: Invalid hex code because " + err));
            co_return;
        }

        // change the color of the roll
        role.set_color(color);

        
        if (roleExisted) {
            
            // attempt to edit the existing role, if failed, tell the caller why
            const dpp::confirmation_callback_t roleEditConfirmation = co_await bot->co_role_edit(role);
            if (roleEditConfirmation.is_error()) {
                co_await event.co_edit_original_response(dpp::message("Error: Couldn't edit your role because " + roleEditConfirmation.get_error().human_readable));
                co_return;
            }
            
        } else {
            // set the role's guild_id and name so it can be created properly
            // and detectable by the bot in the future
            role.set_guild_id(event.command.guild_id);
            role.set_name(user.user_id.str());

            // attempt to create the role, if failed, tell the caller why
            const dpp::confirmation_callback_t roleCreateConfirmation = co_await bot->co_role_create(role);
            if (roleCreateConfirmation.is_error()) {
                co_await event.co_edit_original_response(dpp::message("Error: Could not create your role because " + roleCreateConfirmation.get_error().human_readable));
                co_return;
            }
            
            // get the new role created from above and add it to the user
            role = roleCreateConfirmation.get<dpp::role>();
            user = user.add_role(role.id);

            // attempt to edit the user, if failed, tell the caller why
            const auto guildMemberEditConfirmation = co_await bot->co_guild_edit_member(user);   
            if (guildMemberEditConfirmation.is_error()) {
                co_await event.co_edit_original_response(dpp::message("Error: Could not add role to you because " + guildMemberEditConfirmation.get_error().human_readable));
                co_return;
            }
        }

        // respond to the user on success
        co_await event.co_edit_original_response(dpp::message("Successfully changed your color"));
    }
}
