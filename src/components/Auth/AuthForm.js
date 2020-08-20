import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import ErrorBox from '../ErrorBox/ErrorBox';
import './AuthForm.scss';

const AuthForm = (props) => {

  const [ springProps, setSpringProps ] = useSpring(() => ({from: {transform: 'translate3d(0%,0,0)'}}))
  // spring for error display

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState([])
  const [ showErrors, setShowErrors ] = useState(false); 
  const [ currentSlideIndex, setCurrentSlideIndex ] = useState(0)



  const preventInputTab = e => { // This is to disable tabbing the inputs which breaks things!
      e.which === 9 && e.preventDefault()
    }
  
  useEffect(() => {  // Add event listener attached to each input
    document.querySelectorAll('input').forEach(item => {
      item.addEventListener('keydown', preventInputTab )
    })

    return () => {  // then handler removed when component is killed. 
      document.querySelectorAll('input').forEach(item => {
        item.removeEventListener('keydown', preventInputTab )
      })
    }
  })


  // THIS NEEDS REFACTORED!


  const onSubmit = (e) => {
    const errors = []; // Catch any password errors as being the last slide these are not handled by the next function.
    e.preventDefault();
    const numberOfSlides = props.type === 'login' ? 2 : 3;  // login has email and password slides, sign up also has username
    
    if(!password || password.length < 6) {
      errors.push('Please add a password,  that\'s at least 6 characters in length');
      setShowErrors(true);
      setErrorMessage([...errors])
    } 
    if(errors.length === 0) {  // username and password are fine, check email server side..
      if(props.type === 'signup') {
        props.onSubmit(email, password, username)
        .catch((err) => {
          console.log(err === 'auth/invalid-email')
          if(err === 'auth/invalid-email') {
            errors.push('Invalid email address')
          }else {
            errors.push(err);
          }
          setErrorMessage([...errors])
          setCurrentSlideIndex(currentSlideIndex - 1)
          setSpringProps({transform: `translate3d(${(currentSlideIndex -1 ) * -100 / numberOfSlides }% 0 0)`})
        }) // only interested if things go wrong, so only tacking on the catch()
      }else{
        props.onSubmit(email, password)
          .then((whatComesBack) => console.log(whatComesBack))
          .catch((err) => {
            if(err === 'auth/invalid-email') {
              errors.push('Invalid email address');
            }else if(err === 'auth/user-not-found' || err === 'auth/wrong-password'){
              errors.push('Incorrect email / password')
            }else {
              errors.push(err)
            }
            setErrorMessage([...errors])
            setCurrentSlideIndex(currentSlideIndex - 1)
            setSpringProps({transform: `translate3d(${(currentSlideIndex -1 ) * -100 / numberOfSlides }% 0 0)`})
          })
      }
    }
    console.log(errors)
    setErrorMessage([...errors])
  }

  const getTaperWidth = () => {
    return props.type === 'login' ? '200%' : '300%' // login form has two slides @ 100% each = 200%,  signup has 3 slides..
  }

  const authTaperStyles = {
    display: 'flex',
    width: getTaperWidth()
  }

  const displayButtons = () => {
    if(currentSlideIndex === 1 && props.type === 'login') {
      return (<button className="button button--blue">Login</button>)
    }
    if(currentSlideIndex === 2 && props.type === 'signup'){
      return (<button className="button button--blue">Sign Up</button>)
    }

    return (<span className="button button--blue" onClick={next}>Next</span>)
  }

  const getLegendName = () => { // Enables dynamically changing the legend name as the user slides through the inputs. 
    if(currentSlideIndex === 0) {
      if(props.type === 'login') return 'Email';
      if(props.type === 'signup') return 'Username'
    }else if (currentSlideIndex === 1) {
      if(props.type === 'login') return 'Password';
      if(props.type === 'signup') return 'Email'
    }else {
      return 'Password'
    }
  }

  const move = (numberOfSlides) => { // Abstracted as generic animation used in multiple places
    setSpringProps({transform: `translate3d(${(currentSlideIndex + 1) * -100 / numberOfSlides }% 0 0)`})
    setCurrentSlideIndex(prev => prev + 1 ) 
  }


  const next = () => {
    const numberOfSlides = props.type === 'login' ? 2 : 3
    const errors = [];
    setShowErrors(true)
    // if it's sign  up and username input
    if(props.type === 'signup' && currentSlideIndex === 0) { 
      username.length < 3 && errors.push('Username must be at least 3 characters');
      // if the username length is ok,  send the value server side to check for availability since username needs be unique.
      errors.length === 0 && fetch(`/api/v1/users/checkUsername`,{
        method: 'POST',
        body: JSON.stringify({username}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((jsonRes) => {
        return jsonRes.json();
      })
      .then((res) => {
        if(res.username) { // If all ok, move onto the email slide. 
          move(numberOfSlides)
        }else {
          errors.push([res.error]) // else block progress and display the error
          errors && setErrorMessage([...errors])
        }
      })
    }else if(props.type === 'signup' && currentSlideIndex === 1) {
    // if it's sign up and email input 
      !email && errors.push('An email address is required') // Block progress if blank
      if(errors.length === 0) { // else move on to password slide.
        move(numberOfSlides)
      }

    }else if (props.type === 'login' && currentSlideIndex === 0) {
        // if it's signin and email input 
      !email && errors.push('An email address is required') // Block progress if blank
      if(errors.length === 0) { // else move on to password slide.
        move(numberOfSlides)
      }
    }
    errors && setErrorMessage([...errors])
  }

  return (

    <form className="auth-form" onSubmit={onSubmit}>
    {      
      showErrors && errorMessage.length > 0 &&  <ErrorBox errorMessage={errorMessage} setShowErrors={setShowErrors}/>
      
    }
      <div className="auth-form-wrapper">
      <fieldset>
        <legend> {getLegendName()} </legend>
        <div className="view-window">
          <animated.div className="auth-taper" style={{...springProps, ...authTaperStyles}}>
          {
            props.type === 'signup' && (
            <div className="auth-slide">
              <label htmlFor="username"></label>
              <input 
                type="text"
                name="username"
                id="usernane"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            )
          }
            <div className="auth-slide">
              <label htmlFor="email"></label>
              <input 
                type="text" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />       
            </div>
            <div className="auth-slide">
              <label htmlFor="password"></label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </animated.div>
        </div>
       

      </fieldset>
      </div>
      <div className="auth-button-wrapper">{ displayButtons() }</div>      
    </form>
  )
}

export default AuthForm
