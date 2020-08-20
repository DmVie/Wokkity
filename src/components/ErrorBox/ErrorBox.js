import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorBox = ({errorMessage, setShowErrors}) => {

 const [ show, set ] = useState(false);

 const transitions = useTransition(show, null, {
  from: { position: 'absolute', opacity: 0, transform: 'translate3d(0, 0%, 0)' },
  enter: { opacity: 1, transform: 'translate3d(0, 10%, 0)' },
  leave: { opacity: 0, transform: 'translate3d(0, 0%, 0)' },
 })


 useEffect(() => {
   set(true)
 }, [])

 const killErrorBox = () => {  // This whole timer idea is wrong -- need to look at transitions in react-spring,  problem is without the timer,  the outgoing component dies before the outgoing transition was able to take effect....
   set(false)
   setTimeout(() => {
    setShowErrors(false);
   },500)
   
 }
 
 return  transitions.map(({ item, key, props }) =>
  item && <animated.div key={key} className="error-container" style={props}>
    <FontAwesomeIcon icon="window-close" onClick={killErrorBox} />
    <h3>Error!</h3>
    <ul>
      {errorMessage.map((error, index) => {
        return <li key={index}>{error}</li>
      })}
    </ul>
  </animated.div>
 )}

export default ErrorBox;