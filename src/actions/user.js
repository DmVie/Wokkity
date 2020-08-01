import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startEmPassSignUp = (email, password, username) => {
  return () => {
     firebase.auth().createUserWithEmailAndPassword(email, password)    
    .then((newly) => {
        newly.user.updateProfile({ 
        displayName: username
      })
      .then(() => {
        newly.user.getIdToken(true)
        .then((idToken) => {
          fetch('/api/v1/users/verifyUser', {
            method: 'POST',
            body: JSON.stringify({
              token: idToken, 
              email: newly.user.email,
              username: newly.user.displayName,
              avatar: newly.user.photoURL
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          })          
        });
      })
    })

    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorMessage) {
        console.log(errorCode, errorMessage);
      }
    });
  }
}


export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

// export const startEmPassLogin = (email, password) => {

//   return () => {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .catch(function(error) {
//       const errorCode = error.code;
//       const errorMessage = error.message
//     });
//   }
// }  // Originally this was considered an async thunk action but the problem was the google auth would return an error if for example email / password didn't match but there was no way to get that message back to the authForm component where the errors are displayed,  ( that I could find ). In the end since onAuthStateChanged is observing the whole app,  it doesn't matter where the signInWithEmailAndPassword method is triggered.  With that in mind it was moved to login.js and returned any errors back to the form for output in the error box.

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
}


export const startLogout = () => {
  return () => {
    fetch('/api/v1/users/signout').then(() => {
      return firebase.auth().signOut();
    })   
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}