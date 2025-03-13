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

        dpp::role *role = nullptr;

        for (const auto &roleSnowflake : guild.roles) {
            role = dpp::find_role(roleSnowflake);
            if (role->name != user.user_id.str()) {
                role = nullptr;
                continue;
            }

            break;
        }

        bool roleExisted = true;
        
        if (role == nullptr) {
            roleExisted = false;
            role = new dpp::role();
        }
        
        uint32_t color = std::stoi(colorStr, nullptr, 16);

        role->set_color(color);

        if (roleExisted) {
            bot->role_edit(*role);
        } else {
            role->set_guild_id(guild.id);
            bot->role_create(*role);
        }
        
        user.add_role(role->id);
    }
}
