import { fbAdminApp } from "../admin/init";
import { getFirestore } from "firebase-admin/firestore";

export enum FirestoreCollections {
    ClubRoster="roster",
    Polls="poll",
    PollResponses="pollres",
    InternalTrackers="internal"
}

// Firestore root to be used for all Firestore accesss
export const root = getFirestore(fbAdminApp);