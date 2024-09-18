import { LogRecipient, fallback } from "../../types/logging";


class Logger {

    private recipients: Map<string, LogRecipient[]> 

    constructor() {
        this.recipients = new Map();
        this.recipients.set(fallback(), [async (message) => { console.log(message) }]);
    }

    public log(message: string, target: string, system?: string) {
        if (this.recipients.has(target)) {
            const targets = this.recipients.get(target)!;
            for (const targetFunc of targets) {
                targetFunc(message, target, system);
            }
        } else {
            this.recipients.get(fallback())![0](message, fallback(), system); 
        }
    }

    public addRecipient(target: string, recipient: LogRecipient) {
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
