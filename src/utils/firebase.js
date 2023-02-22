// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "adduser-28ff3.firebaseapp.com",
  projectId: "adduser-28ff3",
  storageBucket: "adduser-28ff3.appspot.com",
  messagingSenderId: "1068312028640",
  appId: "1:1068312028640:web:d419f8beaeafc339c9b785",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
