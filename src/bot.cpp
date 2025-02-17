/**
 * bot.cpp
 * 
 * Main file for Zipcode Discord bot. Runs the bot.
 */

#include <dpp/dpp.h>

constexpr std::string BOT_TOKEN = "TOKEN_HERE";

int main() {

    dpp::cluster bot(BOT_TOKEN);
}