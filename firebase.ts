// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf2Amk4zCz1R4sjVCugqrCsKLYCEGF56w",
  authDomain: "task-ninja-007.firebaseapp.com",
  projectId: "task-ninja-007",
  storageBucket: "task-ninja-007.firebasestorage.app",
  messagingSenderId: "1005789502169",
  appId: "1:1005789502169:web:b4e1f392a88967f07cfcc8",
  measurementId: "G-066CN0STME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
