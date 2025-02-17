/**
 * slash_commands.hpp
 * 
 * Include file for bot slash commands
 */

#ifndef SLASH_COMMANDS_HPP
#define SLASH_COMMANDS_HPP

#include <dpp/cluster.h>

/**
 * Registers all slash commands globally
 * 
 * @param[in, out] bot Bot instance
 */
int register_slash_commands(dpp::cluster& bot);

#endif
