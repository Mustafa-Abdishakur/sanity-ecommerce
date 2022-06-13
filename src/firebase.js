import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: "AIzaSyDL3LiwL8SAsdtw0FY3Z0c_kYT1VfQWwkg",
  authDomain: "electronics-ecommerce.firebaseapp.com",
  projectId: "electronics-ecommerce",
  storageBucket: "electronics-ecommerce.appspot.com",
  messagingSenderId: "546513015701",
  appId: "1:546513015701:web:db8f662961445807fddc9c",
  measurementId: "G-C8LNKJET8Z"
};
let uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '',
  // Privacy policy url.
  privacyPolicyUrl: ''
};
//initialize firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(auth);

if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}



export { uiConfig, auth, db };
