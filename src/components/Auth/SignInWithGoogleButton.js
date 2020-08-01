import React from 'react'

import './SignInWithGoogleButton.scss';

const SignInWithGoogleButton = (props) => {
  return (
    <button className="sign-in-with-google" onClick={props.startGoogleLogin}></button>
  )
}

export default SignInWithGoogleButton
