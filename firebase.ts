// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc_T8z_wkdPX8dne_4MIXEHyMbf8tM9pI",
  authDomain: "netflix-clone-fc406.firebaseapp.com",
  projectId: "netflix-clone-fc406",
  storageBucket: "netflix-clone-fc406.appspot.com",
  messagingSenderId: "760734775340",
  appId: "1:760734775340:web:cf31acc8b28c451ba5b989"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }