import React from 'react'
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import SignInWithGoogleButton from './SignInWithGoogleButton';
import AuthForm from './AuthForm';
import { startGoogleLogin } from '../../actions/user';

import './SignUp.scss';


const SignUp = ({ startGoogleLogin }) => {

  const onSubmit = async  (email, password, username) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((newly) => {
        newly.user.updateProfile({
          displayName: username
        })
        .then(() => {
          newly.user.getIdToken(true)
          .then((idToken) => {
            return fetch('/api/v1/users/verifyUser', {  // expermiment,  might need to remove return statement and the .then(() => resolve())
              method: 'POST',
              body: JSON.stringify({
                token: idToken,
                email: newly.user.email,
                username: newly.user.displayName,
                avatar: newly.user.photoURL
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          })
          .then(() => resolve())
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        if(errorMessage) {
          reject(errorCode)
        }
      });
      
    })
  //   firebase.auth().createUserWithEmailAndPassword(email, password)    
  //  .then((newly) => {
  //      newly.user.updateProfile({ 
  //      displayName: username
  //    })
  //    .then(() => {
  //      newly.user.getIdToken(true)
  //      .then((idToken) => {
  //        fetch('/api/v1/users/verifyUser', {
  //          method: 'POST',
  //          body: JSON.stringify({
  //            token: idToken, 
  //            email: newly.user.email,
  //            username: newly.user.displayName,
  //            avatar: newly.user.photoURL
  //          }),
  //          headers: {
  //            'Content-Type': 'application/json'
  //          },
  //        })          
  //      });
  //    })
  //  })

  //  .catch(function(error) {
  //    // Handle Errors here.
  //    const errorCode = error.code;
  //    const errorMessage = error.message;
  //    if(errorMessage) {
  //      console.log(errorCode, errorMessage);
  //      return errorCode
  //    }
  //  });

  }


  return (
    <div className="signup-container">
      <p>You can sign in to using your google account if you have one</p>

      <SignInWithGoogleButton startGoogleLogin={startGoogleLogin}/>

      <p>Otherwise, fill out the form below to register as a new user:</p>

      <AuthForm onSubmit={onSubmit} type="signup"/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined,  mapDispatchToProps)(SignUp)
