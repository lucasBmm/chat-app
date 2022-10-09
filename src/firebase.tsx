import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNBjXWP1WT_oK9zXyKeXRZN6pp3FQmEl4",
  authDomain: "chat-app-76337.firebaseapp.com",
  projectId: "chat-app-76337",
  storageBucket: "chat-app-76337.appspot.com",
  messagingSenderId: "661456003182",
  appId: "1:661456003182:web:061183b5092de03147067f",
  measurementId: "G-QSWMYHNBZ2"
};

// Initialize Firebase
export const app        = initializeApp(firebaseConfig);
export const auth       = getAuth();
export const storage    = getStorage();
export const analytics  = getAnalytics(app);
export const db         = getFirestore();