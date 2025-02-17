import { ILogTarget, LogRecipient, LogTarget, TypeOfLogTarget, fallback } from "../../types/logging";
import { readdirSync } from "fs";
import { join } from "path";
import { exit } from "process";


class Logger {

    private recipients: Map<string, LogRecipient[]>

    constructor() {
        console.log("LOGGER_INIT");
        this.recipients = new Map();
        this.recipients.set(fallback(), [async (message) => { console.log(message) }]);

        const files = readdirSync(join(__dirname, "./targets")).filter(file => file.endsWith(".js"));
        for (const file of files) {
            try {
                const target = (require(join(__dirname, "./targets/", file))).default as ILogTarget;
                for (const t of target.targets) {
                    this.addRecipient(t, target.message);
                }
            } catch (err) {
                console.log(`LOGGER_ERR_${file.replace(" ", "_").toUpperCase()}`);
                console.log(err);
            }
        }
        console.log("LOGGER_READY");
    }

    public log(message: string, target: TypeOfLogTarget, system?: string) {
        if (this.recipients.has(target)) {
            const targets = this.recipients.get(target)!;
            for (const targetFunc of targets) {
                targetFunc(message, target, system);
            }
        } else {
            this.recipients.get(fallback())![0](message, fallback(), system);
        }
    }

    public addRecipient(target: TypeOfLogTarget, recipient: LogRecipient) {
        if (target === fallback()) return;
        if (this.recipients.has(target)) {
            this.recipients.get(target)?.push(recipient);
        } else {
            this.recipients.set(target, [recipient]);
        }
    }

    public removeTarget(target: string) {
        if (target === fallback()) return;
        this.recipients.delete(target);
    }
}

export const instance = new Logger();
