// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR5dU4-g_1Tc_TQ850zS4SNe9D6PBlRqM",
  authDomain: "ahlaoutv.firebaseapp.com",
  projectId: "ahlaoutv",
  storageBucket: "ahlaoutv.appspot.com",
  messagingSenderId: "580812733041",
  appId: "1:580812733041:web:fc41d9da91d836e64f79d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;