#ifndef DISCORD_BOT_H
#define DISCORD_BOT_H

#include <dpp/dpp.h>
#include <cstdlib>

namespace ZipCode {

    // Singleton class. Read about them here: 
    // https://www.geeksforgeeks.org/implementation-of-singleton-class-in-cpp/
    class DiscordBot {
        private:
            dpp::cluster *bot;
            DiscordBot() {
                bot = new dpp::cluster(std::getenv("DISCORD_BOT_TOKEN"));
                bot->on_log(dpp::utility::cout_logger());
            }
            static DiscordBot *instance;
        public:
            DiscordBot(const DiscordBot &db) = delete;

            static DiscordBot *getInstance() {
                if (instance == nullptr) {
                    instance = new DiscordBot();
                }

                return instance;
            }

            dpp::cluster *getCluster() const {
                return this->bot;
            }
    };

}





#endif //DISCORD_BOT_H
