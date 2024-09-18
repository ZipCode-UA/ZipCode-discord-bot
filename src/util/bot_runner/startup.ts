import { exit } from "process";
import { readdirSync } from "fs";
import { join } from "path";
import { IStartupEvent } from "../../types/startup";
import { instance as logger } from "../logger/logger";
import { LogTarget } from "../../types/logging";

// Dumb type annotation for boolean function
type StartupEventRunner = (() => Promise<boolean>) | { runner: () => Promise<boolean>, onFail: () => Promise<boolean> };

/**
 * Class Startup
 */
class Startup {

    status: "empty" | "ready" | "running" | "starting" | "started";
    startupCritEvents: Map<string, StartupEventRunner>;
    startupNoCritEvents: Map<string, StartupEventRunner>;
    starter?: () => void;

    constructor() {
        this.status = "empty";
        this.startupCritEvents = new Map();
        this.startupNoCritEvents = new Map();
    }

    public addStartupEvent(eventName: string, critical: boolean, runner: () => Promise<boolean>, onFail?: () => Promise<boolean>) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            logger.log("Startup is already running , starting, or started.", LogTarget.Error, "Startup");
            return false;
        }

        if (this.startupCritEvents.has(eventName) || this.startupNoCritEvents.has(eventName)) {
            logger.log(`Event "${eventName}" already exists. Use updateStartEvent to override.`, LogTarget.Error, "Startup");
            return false;
        }

        // Nested ternary to set in correct map and as correct type if onFail provided
        critical ? this.startupCritEvents.set(eventName, 
            onFail ? 
            { runner: runner, onFail: onFail } : runner) 
            : this.startupNoCritEvents.set(eventName, 
                onFail ? 
                { runner: runner, onFail: onFail } 
                : runner);
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    public updateStartupEvent(eventName: string, critical: boolean, runner: () => Promise<boolean>) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            logger.log("Startup is already running , starting, or started.", LogTarget.Error, "Startup");
            return false;
        }

        critical ? this.startupCritEvents.set(eventName, runner) : this.startupNoCritEvents.set(eventName, runner);
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    public removeStartupEvent(eventName: string) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            logger.log("Startup is already running , starting, or started.", LogTarget.Error, "Startup");
            return false;
        }

        if (this.startupCritEvents.has(eventName)) {
            this.startupCritEvents.delete(eventName);
            return true;
        }

        if (this.startupNoCritEvents.has(eventName)) {
            this.startupNoCritEvents.delete(eventName);
            if (this.status == "ready" && !this.__isReady()) this.status = "empty";
            return true;
        }

        logger.log(`Event ${eventName} is not registered.`, LogTarget.Error, "Startup");
        return false;
    }

    public onReady(starter: () => void) {
        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            logger.log("Startup is already running , starting, or started.", LogTarget.Error, "Startup");
            return false;
        }

        this.starter = starter;
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    private __isReady() {
        return (this.startupCritEvents.size > 0 || this.startupNoCritEvents.size > 0) && this.starter;
    }

    public async run() {

        if (this.status != "ready") {
            logger.log("Status is not ready. Unable to run.", LogTarget.Error, "Startup");
            return;
        }
        this.status = "running";

        const runnables: (() => Promise<boolean>)[] = [];
        this.startupCritEvents.forEach((value, key) => {
            const runnable = async () => {
                if ("runner" in value) {
                    const result = await value.runner();
                    if (!result) {
                        await value.onFail();
                        logger.log(`Critical failure for event ${key}. Aborting startup.`, LogTarget.Error, "Startup");
                    }
                    return result;
                } else {
                    const result = await value();
                    if (!result) {
                        logger.log(`Critical failure for event ${key}. Aborting startup.`, LogTarget.Error, "Startup")
                    }
                    return result;
                }

            };
            runnables.push(runnable);
        });

        this.startupNoCritEvents.forEach((value, key) => {
            const runnable = async () => {
                if ("runner" in value) {
                    const result = await value.runner();
                    if (!result) {
                        await value.onFail();
                        logger.log(`Failure for event ${key}. Some features may not be available without a restart.`, LogTarget.Warn, "Startup");
                    }
                } else {
                    const result = await value();
                    if (!result) {
                        logger.log(`Failure for event ${key}. Some features may not be available without a restart.`, LogTarget.Warn, "Startup")
                    }
                }
                return true;
            };
            runnables.push(runnable);
        });

        const results = await Promise.all(runnables.map(runnable => runnable()));
        for (const result of results) {
            if (!result) {
                logger.log("One or more critical failures occured during startup. Aborting startup.", LogTarget.Error, "Startup");
                exit(1); //TODO: Replace with shutdown
            }
        }

        this.starter!(); // We already checked for its existence
    }
}

function init() {
    let instance = new Startup();

    const startupEventFiles = readdirSync(join(__dirname, `./startup_commands`)).filter(file => file.endsWith('.js'));
    for (const file of startupEventFiles) {
        try {
            logger.log(`Reading event from file ${file}`, LogTarget.Info, "Startup");
            let path = join(__dirname, `./startup_events/${file}`);
            const event = (require(path)).default as IStartupEvent;
            instance.addStartupEvent(event.event, event.critical, event.runner, event.onFail);
            logger.log(`Added event from file ${file}`, LogTarget.Info, "Startup");
        } catch (err) {
            logger.log(`Failed to add event from file ${file}`, LogTarget.Error, "Startup");
        }
    }

    return instance;
}

const instance = init();

export default instance;