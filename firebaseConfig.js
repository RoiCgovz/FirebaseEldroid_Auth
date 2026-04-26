import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRcjE3ecMUOz1c5B3-x0qCTtll7LhXX-c",
  authDomain: "wananiayo.firebaseapp.com",
  projectId: "wananiayo",
  storageBucket: "wananiayo.firebasestorage.app",
  messagingSenderId: "527049897049",
  appId: "1:527049897049:web:9fb95b38220376a60fed48"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);