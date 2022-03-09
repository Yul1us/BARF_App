import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Import the functions you need from the SDKs you need
// import { firebase, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9ZbDTIxDJ9MDzybIyVhpnyTiEli_ZjZ8",
    authDomain: "react-reducers.firebaseapp.com",
    projectId: "react-reducers",
    storageBucket: "react-reducers.appspot.com",
    messagingSenderId: "996925983979",
    appId: "1:996925983979:web:2091334d98f007be95c2ae"
  };
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
