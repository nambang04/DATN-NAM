import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCCZ83CKfeCT0TTc72Q9QCFamX9XmPWFQ",
    authDomain: "test2-d9c33.firebaseapp.com",
    databaseURL: "https://test2-d9c33-default-rtdb.firebaseio.com",
    projectId: "test2-d9c33",
    storageBucket: "test2-d9c33.appspot.com",
    messagingSenderId: "226287606000",
    appId: "1:226287606000:web:19f3214b11b911824cca35",
    measurementId: "G-P33CB0M6CS"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Sử dụng getDatabase thay vì database
const auth = getAuth(app);
export { app, auth, db };
export const API_KEY = "AIzaSyDCCZ83CKfeCT0TTc72Q9QCFamX9XmPWFQ";
