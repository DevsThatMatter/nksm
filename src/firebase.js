// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export { auth };
