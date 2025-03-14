#include <cstdlib>
#include <dpp/appcommand.h>
#include <dpp/cluster.h>
#include <dpp/dispatcher.h>
#include <dpp/dpp.h>
#include <dpp/once.h>
#include "DiscordBot.h"
#include "PingCommand.h"
#include "SetColorCommand.h"

// set the instance to nullptr once
ZipCode::DiscordBot* ZipCode::DiscordBot::instance = nullptr;

int main() {
    // Get a pointer to the underlying cluster
    dpp::cluster *bot = ZipCode::DiscordBot::getInstance()->getCluster();

    // Add the slash command event listener
    bot->on_slashcommand(PingCommand::pingCommand);
    bot->on_slashcommand(SetColorCommand::setColorCommand);

    // Add a listener to register all of the bot's commands with discord
    bot->on_ready([&bot](const dpp::ready_t &event) {
        if (dpp::run_once<struct register_bot_commands>()) {
            std::string guildID(std::getenv("GUILD_ID"));

            dpp::slashcommand setColor("set-color",
                                       "Sets your username color", 
                                       bot->me.id);

            setColor.add_option(dpp::command_option(dpp::co_string,
                                                    "color",
                                                    "The new color for your username",
                                                    true));

            bot->guild_command_create(dpp::slashcommand("ping", 
                                                        "Ping pong!",
                                                        bot->me.id),
                                        guildID);
            bot->guild_command_create(setColor, guildID);
        }
    });


    // Start the bot
    bot->start(dpp::st_wait);
}
