import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCXDp2J7AOKEM1JB44zIQnuGoF_RtlLvO0",
    authDomain: "tchat-18b1d.firebaseapp.com",
    projectId: "tchat-18b1d",
    storageBucket: "tchat-18b1d.appspot.com",
    messagingSenderId: "1033104274531",
    appId: "1:1033104274531:web:bbc92d3d900f6da5d97456",
  })
  .auth();
