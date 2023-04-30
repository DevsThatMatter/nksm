// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPMnn-1MLrD6RwYu8TeOeVqcjLOMkOpVg",
  authDomain: "nksm-2023.firebaseapp.com",
  projectId: "nksm-2023",
  storageBucket: "nksm-2023.appspot.com",
  messagingSenderId: "188993232655",
  appId: "1:188993232655:web:89cc6e1675a2257ea6a87a",
  measurementId: "G-35H2BRM3HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
