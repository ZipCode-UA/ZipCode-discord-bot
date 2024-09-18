import { Client, Events } from "discord.js";
import { PermChecker } from "../util/permissions/permissions";

export type IDiscordEventHandler = {
    event: Events,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => ((... args: any[]) => Promise<void>) | ((... args: any[]) => void),
    useHandler: boolean
}