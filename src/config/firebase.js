// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9CSA0brrlBsFVH3b1d5pMME28Z6wzsOY",
  authDomain: "escortee-ff721.firebaseapp.com",
  projectId: "escortee-ff721",
  storageBucket: "escortee-ff721.appspot.com",
  messagingSenderId: "1016502809821",
  appId: "1:1016502809821:web:6bfc001d9117e1ba985734",
  measurementId: "G-3KLQHYG0J7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
