#include <dpp/dispatcher.h>


// Give it it's own namespace so that we can have multiple listeners in different files
// with the same signatures as one another
namespace PingCommand {
    void pingCommand(const dpp::slashcommand_t&);
}
