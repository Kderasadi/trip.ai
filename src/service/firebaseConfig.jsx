// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "gen-lang-client-0461719458.firebaseapp.com",
  projectId: "gen-lang-client-0461719458",
  storageBucket: "gen-lang-client-0461719458.firebasestorage.app",
  messagingSenderId: "220209544978",
  appId: "1:220209544978:web:b78e7d3ee2d9616dd0fdcb",
  measurementId: "G-N4NS9Z5CN6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
