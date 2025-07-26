// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmSE-niV4Q1hFuRFcuYHBkVI77Zp8V6LA",
  authDomain: "hello-e9752.firebaseapp.com",
  projectId: "hello-e9752",
  storageBucket: "hello-e9752.appspot.com",  // <-- fixed typo here
  messagingSenderId: "358860732874",
  appId: "1:358860732874:web:970fc2efe14b3312203733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
