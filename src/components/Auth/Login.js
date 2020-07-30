import React from 'react'
import { connect } from 'react-redux';
import './Login.scss';

import SignInWithGoogleButton from '../Auth/SignInWithGoogleButton';
import AuthForm from '../Auth/AuthForm';
import { startGoogleLogin, startEmPassLogin } from '../../actions/user';

const Login = ({startGoogleLogin, startEmPassLogin}) => {

  const onSubmit = (email, password) => {
    console.log('Email is ', email );
    console.log('Password is ', password);
    startEmPassLogin(email, password);
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
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startEmPassLogin: (email, password) => dispatch(startEmPassLogin(email, password))
})

export default connect(undefined, 
  mapDispatchToProps)(Login)
