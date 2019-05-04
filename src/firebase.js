import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

export const config = {
  apiKey: "AIzaSyARqADURG5t2hPf_Tx_O_0sthb4CNR52oE",
  authDomain: "moon-coins.firebaseapp.com",
  databaseURL: "https://moon-coins.firebaseio.com",
  projectId: "moon-coins",
  storageBucket: "moon-coins.appspot.com",
  messagingSenderId: "974484982196",
  appId: "1:974484982196:web:73a4d277d7427a72"
};

!firebase.apps.length && firebase.initializeApp(config);

export default firebase;
