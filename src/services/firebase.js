import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKSkG-6Ftg8yM_Ez69H3LYj0NdKqkbmVM",
    authDomain: "educanet-70549.firebaseapp.com",
    projectId: "educanet-70549",
    storageBucket: "educanet-70549.appspot.com",
    messagingSenderId: "816592384727",
    appId: "1:816592384727:web:0771dc688540f372b13692",
    measurementId: "G-8KK02N4G0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
