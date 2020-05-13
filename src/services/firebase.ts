import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import { FIREBASE_DEV_CONFIG, FIREBASE_PROD_CONFIG } from "config/firebase";

// Initialize Firebase

const config =
  process.env.NODE_ENV === "production"
    ? FIREBASE_PROD_CONFIG
    : FIREBASE_DEV_CONFIG;

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, firebase, googleProvider };
