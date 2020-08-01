import React from 'react'
import { connect } from 'react-redux';
import './Login.scss';
import { firebase } from '../../firebase/firebase';

import SignInWithGoogleButton from '../Auth/SignInWithGoogleButton';
import AuthForm from '../Auth/AuthForm';
import { startGoogleLogin,  } from '../../actions/user';

const Login = ({startGoogleLogin}) => {

  const onSubmit = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error.code)
    return error.code
  });
  }


  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <SignInWithGoogleButton startGoogleLogin={startGoogleLogin}/>
      <p> OR </p>
      <p> Sign in with email and password: </p>
      <AuthForm onSubmit={onSubmit} type="login"/>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, 
  mapDispatchToProps)(Login)
