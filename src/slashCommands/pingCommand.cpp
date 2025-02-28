#include <dpp/dpp.h>
#include "PingCommand.h"


namespace PingCommand {
    void pingCommand(const dpp::slashcommand_t &event) {
        if (event.command.get_command_name() != "ping") return;


        event.reply("Pong!");
    }
}
