/**
 * slash_commands.cpp
 * 
 * Implementation file for bot slash command functions
 */

#include "slash_commands.hpp"

#include <vector>
#include <dpp/appcommand.h>

/**
 * Adds slash commands to a buffer
 * 
 * @param[in, out] command_buffer Buffer for commands
 * @param[in] bot Bot to register commands to
 */
void add_commands_to_buffer(std::vector<dpp::slashcommand>& command_buffer, const dpp::cluster& bot);

/**
 * Registers all slash commands globally
 * 
 * @param[in, out] bot Bot instance
 */
int registerSlashCommands(dpp::cluster& bot) {
    
    // Clear old commands
    bot.global_bulk_command_delete();

    std::vector<dpp::slashcommand> commands;
    add_commands_to_buffer(commands, bot);
}

void add_commands_to_buffer(std::vector<dpp::slashcommand>& command_buffer, const dpp::cluster& bot) {
    command_buffer.push_back(dpp::slashcommand("ping", "Ping pong!", bot.me.id));
}