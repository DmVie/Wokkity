import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const startEmailPassLogin = (email, password) => {
  return () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message
      console.log(errorCode, errorMessage);
    });
  }
}

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
}

export const startLogout = () => {
  return () => {
    console.log('pants')
    fetch('/api/v1/users/signout').then(() => {
      console.log('fetch request to sign out')
      return firebase.auth().signOut();
    })   
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}