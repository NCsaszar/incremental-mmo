// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3OSYxqMEeJjpj65SWo2eIQssqoff0YTg",
  authDomain: "incremental-mmo.firebaseapp.com",
  projectId: "incremental-mmo",
  storageBucket: "incremental-mmo.appspot.com",
  messagingSenderId: "218516805847",
  appId: "1:218516805847:web:1238c64b19470ffc817892",
  measurementId: "G-D21PFV9KJ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
