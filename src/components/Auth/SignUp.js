import React from 'react'
import { connect } from 'react-redux';

import SignInWithGoogleButton from './SignInWithGoogleButton';
import AuthForm from './AuthForm';
import { startGoogleLogin, startEmPassSignUp } from '../../actions/user';

import './SignUp.scss';


const SignUp = ({ startGoogleLogin, startEmPassSignUp }) => {

  const onSubmit = (email, password, username) => {
    startEmPassSignUp(email, password, username);
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <p>You can sign in to our app using your google account if you have one</p>

      <SignInWithGoogleButton startGoogleLogin={startGoogleLogin}/>

      <p>Otherwise, fill out the form below to register as a new user:</p>

      <AuthForm onSubmit={onSubmit} type="signup"/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startEmPassSignUp: (email, password, username) => dispatch(startEmPassSignUp(email, password, username))
})

export default connect(undefined,  mapDispatchToProps)(SignUp)
