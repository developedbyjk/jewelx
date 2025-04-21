// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzHQFj9H6G0VxJB3DSUZ7pvcy7NshTOmQ",
  authDomain: "jewelx-467dc.firebaseapp.com",
  projectId: "jewelx-467dc",
  storageBucket: "jewelx-467dc.firebasestorage.app",
  messagingSenderId: "904965513570",
  appId: "1:904965513570:web:7adb3d7d190e0d84e10c3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);



export {app, auth, db}