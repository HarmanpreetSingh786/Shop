// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbypve4BuCoxPsmUTBjwOuIPXlaJ2_OMc",
  authDomain: "shop-eaze.firebaseapp.com",
  projectId: "shop-eaze",
  storageBucket: "shop-eaze.appspot.com",
  messagingSenderId: "570136669",
  appId: "1:570136669:web:5362f0f654990eab7d15b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }