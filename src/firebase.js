import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: process.env.REACT_APP_AUTH_API,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_ID,
    storageBucket: "tchat-18b1d.appspot.com",
    messagingSenderId: "1033104274531",
    appId: process.env.REACT_APP_AUTH_APP_ID,
  })
  .auth();
