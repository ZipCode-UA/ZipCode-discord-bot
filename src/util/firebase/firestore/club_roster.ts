import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { FirestoreCollections, root } from "./root";
import { Snowflake } from "discord.js";

enum ClubRosterPermissionsFlags {
    ManageMembers=1,
    ManageProjects=2,
    ManageAnnouncements=4,
    ProposeProjects=8,
}

type ClubRosterDoc = {
    firstName: string,
    lastName: string,
    discordId: Snowflake,
    uakronEmail: string,
    perms: number,
}

class FirestoreClubRosterManager {
    private collection = collection(root, FirestoreCollections.ClubRoster).withConverter({
        toFirestore: (datum: ClubRosterDoc) => datum,
        fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as ClubRosterDoc
    });

    async getRoster() {
        return await getDocs(this.collection);
    }
}

export const fsClubRosterManager = new FirestoreClubRosterManager();