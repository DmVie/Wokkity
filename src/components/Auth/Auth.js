import React, { useState, useEffect } from 'react';
import { useTransition,  animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Auth.scss'
import Button from '../Button/Button';
import Login from './Login';
import Signup from './SignUp';
import { firebase } from '../../firebase/firebase';

const Auth = ({cancelLoginModal}) => {

  const [form, setForm ] = useState('login')
  const [ show, set ] = useState(false);

  const transitions = useTransition(show, null, {
   from: {  opacity: 0, transform: 'translate3d(0, -50%, 0)' },
   enter: { opacity: 1, transform: 'translate3d(0, -5%, 0)' },
   leave: { opacity: 0, transform: 'translate3d(0, -50%, 0)' },
  })


  useEffect(() => {
    set(true)
  }, [])

  const killModal = () => {
    set(false)
    setTimeout(() => {
      cancelLoginModal()
    }, 300)
  }

  // Set this listener to detect the logged in event and cancel the login modal when the user is signed in
  firebase.auth().onAuthStateChanged((user) => {
    if(user) cancelLoginModal()
  })

  return  transitions.map(({ item, key, props }) =>
  item && <animated.div className="auth-container" key={key} style={props}>
      <div className="auth-container-wrapper">
        <div className="auth-header">
          <FontAwesomeIcon icon="window-close" style={{background: 'white'}} onClick={killModal}/>
          <Button className={`button button--tab ${form === 'login' ? 'active' : ''}`} onClick={() => setForm('login')}> Sign In</Button>
          <Button className={`button button--tab ${form === 'signup' ? 'active' : ''}`} onClick={() => setForm('signup')}> Sign Up</Button>
        </div>
        <section className="auth-content">
          {form === 'login' ? <Login /> : <Signup />}
        </section>
      </div>
    </animated.div>
  )
}


export default Auth
