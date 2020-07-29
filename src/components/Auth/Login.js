import React, { useState } from 'react'
import { connect } from 'react-redux';
import './Login.scss';
import Button from '../Button/Button'

import { startGoogleLogin, startEmailPassLogin } from '../../actions/user';

const Login = ({startGoogleLogin, startEmailPassLogin}) => {

  const [ email, setEmail ] = useState("");
  const [ password, setPass ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState([])
  

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPass(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    if(!email || !password) {
       setErrorMessage([...errorMessage, 'Email and Password are both required'])
    }

    if(password.length < 4) {
       setErrorMessage([...errorMessage, 'Password must a minimum of 4 characters'])
    }

   if(errorMessage.length === 0) {
    startEmailPassLogin(email, password)
   }    
  }

  return (
    <div className="login-container">
    <h1>Sign In</h1>
    <button className="sign-in-with-google" onClick={startGoogleLogin}></button>
    <p> OR </p>
    <p> Sign in with email and password: </p>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email"></label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
      <label htmlFor="password"></label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button className="button button--blue">Go</Button>
      </div>
    </form>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startEmailPassLogin: (email, password) => dispatch(startEmailPassLogin(email, password))
})

export default connect(undefined, 
  mapDispatchToProps)(Login)
