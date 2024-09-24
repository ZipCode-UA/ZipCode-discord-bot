import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export enum FirestoreCollections {
    ClubRoster="roster",
    Polls="poll",
    PollResponses="pollres",
}

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "hakron5000discordbot.firebaseapp.com",
    projectId: "hakron5000discordbot",
    storageBucket: "hakron5000discordbot.appspot.com",
    messagingSenderId: "34979080766",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-XSHKPM55B3"
};

// Firestore root to be used for all Firestore accesss
export const root = getFirestore(initializeApp(firebaseConfig));