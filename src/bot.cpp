/**
 * bot.cpp
 * 
 * Main file for Zipcode Discord bot. Runs the bot.
 */

#include <cstdlib>
#include <dpp/dpp.h>
#include <iostream>
#include <string>

constexpr std::string botTokenEnv{ "BOT_TOKEN" };

int main() {

    // Get token from env
    char* token;
    std::cout << "Getting env var '" << botTokenEnv.c_str() << "':\n";
    token = std::getenv(botTokenEnv.c_str());
    if (!token) {
        std::cerr << "Error: No token provided\n";
        return 1;
    }

    dpp::cluster bot(token);
    bot.on_ready([&bot](const dpp::ready_t ready_event) {
        bot.set_presence(dpp::presence(dpp::ps_online, dpp::at_watching, " over your server!"));
        std::cout << "Bot online!\n";
    });

    bot.start(dpp::st_wait);

    return 0;
}
