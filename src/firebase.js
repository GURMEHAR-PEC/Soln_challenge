// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzFkebtxGlIQp_Cyx0VCpwLL59Yg7_JY",
  authDomain: "safehaven-3e960.firebaseapp.com",
  projectId: "safehaven-3e960",
  storageBucket: "safehaven-3e960.appspot.com",
  messagingSenderId: "705620169035",
  appId: "1:705620169035:web:48faeac1f0c1396c16d8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Function to handle Google sign-in
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export { app, auth, signInWithGoogle };
