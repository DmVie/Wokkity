import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDM5_3im_WxS_TTTDhVOn20QJWLsGvWPD4",
  authDomain: "wokkiti.firebaseapp.com",
  databaseURL: "https://wokkiti.firebaseio.com",
  projectId: "wokkiti",
  storageBucket: "wokkiti.appspot.com",
  messagingSenderId: "99377518966",
  appId: "1:99377518966:web:110beb1695bd5237eb8257",
  measurementId: "G-CG3Y0SGQR6"
};


firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider }