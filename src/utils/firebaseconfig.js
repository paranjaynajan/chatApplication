// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf6Bq_tZzfy6pLCezWL_CzenGzmwq5290",
  authDomain: "chatapplicationparanjay.firebaseapp.com",
  projectId: "chatapplicationparanjay",
  storageBucket: "chatapplicationparanjay.appspot.com",
  messagingSenderId: "553485662632",
  appId: "1:553485662632:web:2fa8c9103ff6e1826a459d",
  measurementId: "G-RXZVCWX1FW",
  databaseUrl:"https://chatapplicationparanjay-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);