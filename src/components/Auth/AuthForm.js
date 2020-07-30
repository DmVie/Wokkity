import React, { useState } from 'react';

import Button from '../Button/Button';

import './AuthForm.scss';

const AuthForm = (props) => {

  const [ email, setEmail ] = useState("");
  const [ password, setPass ] = useState("");
  const [ username, setUsername ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState([])
  
  const onSubmit = (e) => {
    e.preventDefault()
    if(!email || !password) {
       setErrorMessage([...errorMessage, 'Email and Password are both required'])
    }

    if(password.length < 4) {
       setErrorMessage([...errorMessage, 'Password must a minimum of 4 characters'])
    }

    if(props.type === 'signup') {
      if(username.length < 3) {
        setErrorMessage([...errorMessage, 'Username must be 3 or more characters in length'])
      }
    }

   if(errorMessage.length === 0) {
      props.onSubmit(email, password, username)
   }    
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
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
            onChange={(e) => setPass(e.target.value)}
          />
      </div>
      <div>
        <Button className="button button--blue">Go</Button>
      </div>
    </form>
  )
}

export default AuthForm
