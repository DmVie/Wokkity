import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startEmPassSignUp = (email, password, username) => {
  return () => {
     firebase.auth().createUserWithEmailAndPassword(email, password)    
    .then((newly) => {
        console.log('muser ', newly.user)
        newly.user.updateProfile({ 
        displayName: username
      })
      .then(() => {
        console.log('what is this mofo ', newly.user)
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
        console.log('Errrrrrr ', errorCode, errorMessage);
      }
    });
  }
}


// WORKING HERE!! -->  Don't think the emPassSignUp action is necessary - the standard login action can be dispatched  since it's doing the same thing --- setting the uid into store to confirm their auth status of signed in ????
// export const emPassSignup = () => {

// }

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const startEmPassLogin = (email, password, username) => {

  return () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
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