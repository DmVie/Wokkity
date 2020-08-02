import React, { useState } from 'react';

import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AuthForm.scss';

const AuthForm = (props) => {

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState([])
  const [ showErrors, setShowErrors ] = useState(true)


  const onSubmit = (e) => {
    setShowErrors(true)
    e.preventDefault();

    const errors = [];

    props.type === 'signup' && username.length < 3 && errors.push('Username must be more than 3 characters');
    (!email || !password) && errors.push('Email and Password are both required');
    password.length < 6 && errors.push('Password must be more than 5 characters')

    setErrorMessage(errors);
    if(errors.length === 0) {
      if(props.type === 'signup') {
        // check if the username is available
        fetch(`/api/v1/users/checkUsername`, {
          method: 'POST',
          body: JSON.stringify({ username }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((jsonRes) => {
          return jsonRes.json()
        })
        .then((res) => {
          res.username ? props.onSubmit(email, password, res.username) : setErrorMessage([res.error])
        })
        .catch((e) => console.log(e.message))
      }else {
       props.onSubmit(email, password).then((res) => {
        let signinError;
        if(res === 'auth/wrong-password' || 'auth/user-not-found'){ 
          signinError = ['This email / password combination is incorrect']
        }else if(res === 'auth/too-many-requests') {
          signinError = ['Too many incorrect attempts, please try again later..']
        }
        signinError.length > 0 &&  setErrorMessage(signinError)
       })
      }
    }
  }



  return (
    <form className="auth-form" onSubmit={onSubmit}>
    {
      showErrors && errorMessage.length > 0 && (
        <div className="error-container">
          <FontAwesomeIcon icon="window-close" onClick={() => setShowErrors(false)} />
          <h2>Error!</h2>
          <ul>
            {errorMessage.map((error, index) => {
              return <li key={index}>{error}</li>
            })}
          </ul>
        </div>
      )
    }
     {
       props.type === 'signup' && (
        <div>
          <label htmlFor="username"></label>
          <input 
            type="text"
            name="username"
            id="usernane"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
       )
     }
      <div>
        <label htmlFor="email"></label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <div>
        <Button className="button button--blue">Go</Button>
      </div>
    </form>
  )
}

export default AuthForm
