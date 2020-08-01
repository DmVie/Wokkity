import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Auth.scss'
import Button from '../Button/Button';
import Login from './Login';
import Signup from './SignUp';
import { firebase } from '../../firebase/firebase';

const Auth = (props) => {

  const [form, setForm ] = useState('login')

  // Set this listener to detect the logged in event and cancel the login modal when the user is signed in
  firebase.auth().onAuthStateChanged((user) => {
    if(user) props.cancelLoginModal()
  })

  return (
    <section className="auth-container">
      <div className="auth-container-wrapper">
        <div className="auth-header">
          <FontAwesomeIcon icon="window-close" style={{background: 'white'}} onClick={() => props.cancelLoginModal()}/>
          <Button className={`button button--tab ${form === 'login' ? 'active' : ''}`} onClick={() => setForm('login')}> Log In</Button>
          <Button className={`button button--tab ${form === 'signup' ? 'active' : ''}`} onClick={() => setForm('signup')}> Sign Up</Button>
        </div>
        <section className="auth-content">
          {form === 'login' ? <Login /> : <Signup />}
        </section>
      </div>
    </section>
  )
}


export default Auth
