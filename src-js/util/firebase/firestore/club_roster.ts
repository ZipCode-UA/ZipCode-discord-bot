import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirestoreCollections, root } from "./root";
import { Snowflake } from "discord.js";
import { instance as logger } from "../../logger/logger";

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
    uakronStudentId: string,
    perms: number,
}

class FirestoreClubRosterManager {

    private collection = root.collection(FirestoreCollections.ClubRoster).withConverter({
        toFirestore: (data: ClubRosterDoc) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ClubRosterDoc,
    });

    public async getRoster() {
        return (await this.collection.get()).docs.map(doc => doc.data());
    }

    public async createRosterMember(firstName: string, lastName: string, discordId: Snowflake, uakronEmail: string, uakronStudentId: string, perms: number) {
        const docRef = this.collection.doc(uakronStudentId);
        if ((await docRef.get()).exists) {
            
        }
        
    }

    public async updateRosterMember(firstName: string, lastName: string, discordId: Snowflake, uakronEmail: string, uakronStudentId: string, perms: number) {

    }

    public async removeRosterMember(uakronStudentId: string) {

    }
}

export const fsClubRosterManager = new FirestoreClubRosterManager();