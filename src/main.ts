import { Client, GatewayIntentBits } from "discord.js";
import { exit } from "process";
import { setEventHandlers } from "./util";
import { initPerms } from "./util/permissions/permissions";
import { instance as logger } from "./util/logger/logger";
import { LogTarget } from "./types/logging";

const TOKEN = process.env.TOKEN || "NO_TOKEN_PROVIDED";
const USE_CUSTOM_PERMS = process.env.USE_CUSTOM_PERMISSIONS === "TRUE" ? true : false;

// Holy crap that's a lot of intention :flushed:
const intent_flags = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.GuildVoiceStates,
];

var client = new Client({ intents: intent_flags });
if (!client) {
  logger.log("Failed to instantiate client.", LogTarget.Error, "Bot");
  exit(1);
}

let checkPerms;
if (USE_CUSTOM_PERMS) checkPerms = initPerms();
setEventHandlers(client, checkPerms);

client.login(TOKEN);
