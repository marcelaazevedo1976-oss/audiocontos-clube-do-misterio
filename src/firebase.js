import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARrs3szmFTRHLNSWjsOjGQibx-XvRhwAU",
  authDomain: "clube-do-misterio-7972c.firebaseapp.com",
  projectId: "clube-do-misterio-7972c",
  storageBucket: "clube-do-misterio-7972c.firebasestorage.app",
  messagingSenderId: "1097654132421",
  appId: "1:1097654132421:web:1483523dde93ebf6715aac",
  measurementId: "G-9Y530XRD6G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
