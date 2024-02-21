// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVRVRXHd82IJnyiyEU_CQG6zyJFqaH7CA",
    authDomain: "chatapp-603eb.firebaseapp.com",
    projectId: "chatapp-603eb",
    storageBucket: "chatapp-603eb.appspot.com",
    messagingSenderId: "668278400262",
    appId: "1:668278400262:web:16a915748f5f25f45b2a87",
    measurementId: "G-0YSCR5RGJE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
const analytics = getAnalytics(app);