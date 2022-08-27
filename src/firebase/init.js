// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzgo3HfEzrge2e6hbFicFqXkwGbzz0hFA",
  authDomain: "fir-practice-acb41.firebaseapp.com",
  projectId: "fir-practice-acb41",
  storageBucket: "fir-practice-acb41.appspot.com",
  messagingSenderId: "972734015991",
  appId: "1:972734015991:web:ceaa2a20ce5c541858e6f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();