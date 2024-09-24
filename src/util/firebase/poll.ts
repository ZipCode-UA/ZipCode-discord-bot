import { collection } from "firebase/firestore"
import { FirestoreCollections, root } from "./root"

type Poll = {
    id: string,
    prompt: string,
    responseOptions: {id: number, content: string}[],
    responsesAllowed: number,
}

type PollResponse = {
    uakronEmail: string,
    responses: number[]
}

class FirestorePollManager {
    private pollCollection = collection(root, FirestoreCollections.Polls);
    private responseCollection = collection(root, FirestoreCollections.PollResponses);
}

export const fsPollManager = new FirestorePollManager();