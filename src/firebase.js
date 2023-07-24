// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcGZFPjOVKUPJ8fV0Y4xRjqrWboufXpG4",
  authDomain: "podcast-app-f35ff.firebaseapp.com",
  projectId: "podcast-app-f35ff",
  storageBucket: "podcast-app-f35ff.appspot.com",
  messagingSenderId: "952279094025",
  appId: "1:952279094025:web:6ff18f757122713a7b79d8",
  measurementId: "G-KSYVPETMNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export{auth, db, storage};
