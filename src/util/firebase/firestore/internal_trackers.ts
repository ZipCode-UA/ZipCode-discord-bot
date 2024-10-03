import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirestoreCollections, root } from "./root";
import { instance as logger } from "../../logger/logger";
import { LogTarget } from "../../../types/logging";

const HAKRON_TRACKERS = "hakron" as const;

/**
 * Type representing all of the data in the trackers
 * object. This type will be updated as values are added.
 * 
 * Essentially, a database singleton to keep track of available IDs
 * or other various useful metadata.
 * 
 * @member availablePollIds An array containing the available poll ids. If no polls are active, contains integers 0-9.
 */
type InternalTrackersDoc = {
    availablePollIds: number[],
}

class InternalTrackersManager {

    private docRef = root.collection(FirestoreCollections.InternalTrackers).withConverter({
        toFirestore: (data: InternalTrackersDoc) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as InternalTrackersDoc,
    }).doc(HAKRON_TRACKERS);
    private cached: InternalTrackersDoc | undefined;
    private lastCommitted: Date = new Date(Date.now() - (1000 * 60 * 60)); // Initialize to 1 hour before now for immediate refresh

    /**
     * WARNING: Dangerous
     * 
     * Sets all values in the tracking document to their
     * default values.
     */
    public async setDefaults() {

        logger.log("Trackers overwritten", LogTarget.Warn, "InternalTrackersManager");
        const defaultDoc: InternalTrackersDoc = {
            availablePollIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        this.cached = defaultDoc;
        this.docRef.set(defaultDoc);
        this.lastCommitted = new Date(Date.now());
    }

    /**
     * Gets the trackers document and caches it for quick access.
     */
    private async get() {
        this.cached = (await this.docRef.get()).data();
        if (!this.cached) await this.setDefaults();
    }

    /**
     * Commits the document to the database
     */
    private async commitDoc() {
        if (this.cached) {
            await this.docRef.set(this.cached);
            this.lastCommitted = new Date(Date.now());
        }
    }

    /**
     * Predicate function that commits and re-fetches the cache to test connection to firestore
     * 
     * @returns Promise<boolean> indicating whether a successful commit and get were performed
     */
    public async connected() {
        if (this.cached) {
            await this.commitDoc();
            this.cached = undefined;
        }
        await this.get();
        return this.cached ? true : false;
    }
}

export const fsInternalTrackersManager = new InternalTrackersManager();