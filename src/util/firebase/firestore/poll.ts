import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirestoreCollections, root } from "./root";
import { fsInternalTrackersManager } from "./internal_trackers";
import { instance as logger } from "../../logger/logger";
import { LogTarget } from "../../../types/logging";
import { GuildTextBasedChannel, Snowflake } from "discord.js";

type FsPollStatus = "setup" | "open" | "closed";
type FsPoll = {
    messageId: Snowflake,
    channelId: Snowflake,
    nickname: string,
    status: FsPollStatus,
}

const MAX_POLL_RESPONSES = 10

class FirestorePollManager {
    
    private pollCollection = root.collection(FirestoreCollections.Polls).withConverter({
        toFirestore: (data: FsPoll) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as FsPoll,
    });

    /**
     * Registers a new poll on firestore
     * 
     * @param messageId The Discord message id for the poll
     * @param channelId The Discord channel id for the poll
     * @param nickname The nickname for the poll
     * 
     * @returns The write time from the write result
     */
    public async addPoll(messageId: string, channelId: string, nickname: string) {
        return (await this.pollCollection.doc(nickname).set({
            messageId: messageId,
            channelId: channelId,
            nickname: nickname,
            status: "setup",
        })).writeTime;
    }

    /**
     * Fetches and returns the poll with pollId
     * 
     * @param nickname
     * @returns 
     */
    public async getPoll(nickname: string) {
        const poll = (await this.pollCollection.doc(nickname).get()).data();
        if (!poll) {
            logger.log(`Poll with ID ${nickname} does not exist.`, LogTarget.Warn, "FirebasePollManager");
            return;
        }
        return poll;
    }
}

export const fsPollManager = new FirestorePollManager();