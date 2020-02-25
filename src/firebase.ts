import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase

const config = {
  apiKey: "AIzaSyBYCJViFQPfuqlLoExyBxF8-tc_1kpKCtc",
  authDomain: "todo-app-269312.firebaseapp.com",
  databaseURL: "https://todo-app-269312.firebaseio.com",
  projectId: "todo-app-269312",
  storageBucket: "todo-app-269312.appspot.com",
  messagingSenderId: "700782582189",
  appId: "1:700782582189:web:343a3398ce1a11d4c66924",
  measurementId: "G-HL1ZZCZZMY"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, firebase, googleProvider };
