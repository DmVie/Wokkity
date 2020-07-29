import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startSignUp = (email, password) => {
  return () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorMessage) {
        console.log('Errrrrrr ', errorCode, errorMessage);
      }
    });
  }
}

export const signup = () => {

}

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
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