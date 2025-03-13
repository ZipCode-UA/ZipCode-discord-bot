#include <dpp/cache.h>
#include <dpp/dpp.h>
#include "SetColorCommand.h"
#include "DiscordBot.h"


namespace SetColorCommand {
    void setColorCommand(const dpp::slashcommand_t &event) {
        dpp::cluster *bot = ZipCode::DiscordBot::getInstance()->getCluster();
        const std::string GUILD_ID = std::getenv("GUILD_ID");

        if (event.command.get_command_name() != "set-color") return;

        std::string colorStr = event.command.
            get_command_interaction().
            get_value<std::string>(0);

        dpp::guild guild = event.command.get_guild();

        dpp::guild_member user = dpp::find_guild_member(event.command.guild_id,
                                                         event.command.usr.id);

        dpp::role *rolePtr = nullptr;

        for (const auto &roleSnowflake : guild.roles) {
            rolePtr = dpp::find_role(roleSnowflake);
            if (rolePtr->name != user.user_id.str()) {
                rolePtr = nullptr;
                continue;
            }

            break;
        }

        bool roleExisted = true;
        
        if (rolePtr == nullptr) {
            roleExisted = false;
            rolePtr = new dpp::role();
        }

        if (colorStr.starts_with('#')) {
            colorStr = colorStr.substr(1);
        }

        if (colorStr.length() != 6) {
            event.reply("Error: Invalid length for hex code. Do not include an alpha channel");
            return;
        }
        
        uint32_t color = std::stoi(colorStr, nullptr, 16);

        rolePtr->set_color(color);

        dpp::role role;

        bool wait = true;

        if (roleExisted) {
            bot->role_edit(*rolePtr);
        } else {
            rolePtr->set_guild_id(guild.id);
            rolePtr->set_name(user.user_id.str());
            bot->role_create(*rolePtr, [&role, &wait](const dpp::confirmation_callback_t &ev) {
                if (!ev.is_error()) {
                    role = std::get<dpp::role>(ev.value);
                }
                wait = false;
            });

            while (wait) {}
        }

        rolePtr = &role;
        
        user = user.add_role(rolePtr->id);

        std::cout << "USER: " << user.get_nickname() << std::endl;
        for (const auto &r : user.get_roles()) {
            std::cout << r.str() << std::endl;
        }

        std::string err = "";

        bot->guild_edit_member(user, [&err](const dpp::confirmation_callback_t &ev) {
            if (ev.is_error()) {
                const dpp::cluster *bot = ev.bot;

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
