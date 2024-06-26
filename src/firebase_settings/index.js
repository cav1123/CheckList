// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJz_hNJqdKAl3yIG4-Ioofx5lm1vSX08g",
    authDomain: "checklist-742e6.firebaseapp.com",
    projectId: "checklist-742e6",
    storageBucket: "checklist-742e6.appspot.com",
    messagingSenderId: "65407197467",
    appId: "1:65407197467:web:5daa9a2c765b3dd866f3be",
    measurementId: "G-5QWP7D8YH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth()

export default { analytics, db, auth };