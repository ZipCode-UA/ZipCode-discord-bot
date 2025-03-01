#include <dpp/dpp.h>
#include "PingCommand.h"


namespace PingCommand {
    void pingCommand(const dpp::slashcommand_t &event) {
        // Do not do anything if the command name is wrong
        if (event.command.get_command_name() != "ping") return;


        // Reply to the slash command
        event.reply("Pong!");
    }
}
