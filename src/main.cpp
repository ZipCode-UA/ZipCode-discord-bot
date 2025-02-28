#include <cstdlib>
#include <dpp/appcommand.h>
#include <dpp/cluster.h>
#include <dpp/dispatcher.h>
#include <dpp/dpp.h>
#include <dpp/once.h>
#include "DiscordBot.h"
#include "PingCommand.h"

ZipCode::DiscordBot* ZipCode::DiscordBot::instance = nullptr;

int main() {
    ZipCode::DiscordBot *discordBot = ZipCode::DiscordBot::getInstance();
    dpp::cluster *bot = discordBot->getCluster();


    bot->on_slashcommand(PingCommand::pingCommand);

    bot->on_ready([&bot](const dpp::ready_t &event) {
        if (dpp::run_once<struct register_bot_commands>()) {
            bot->guild_command_create(dpp::slashcommand("ping", "Ping pong!", bot->me.id),
                                      std::string(std::getenv("GUILD_ID")));
        }
    });


    bot->start(dpp::st_wait);
}
