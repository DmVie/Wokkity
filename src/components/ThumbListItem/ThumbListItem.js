import React, { useState, useEffect  } from 'react';
import './ThumbListItem.scss';

import Banner from '../Banner/Banner';
import Anim8able from '../../services/Anim8able/Anim8able';


const ThumbListItem = ({id, title, img, shortDesc}) => {

  const [state, setState ] = useState('overlayOff')

  const mouseInEl = () => {
    setState('overlayOn')    
  }
  
  const mouseOutEl = () => {
    setState('overlayOff')
  }

  const toggleShowOverlay = () => {
    let toggle = state === 'overlayOff' ?  'overlayOn' : 'overlayOff';
    setState(toggle)
  }

  /* Anim8able */
  const [yPos, setYPos ] = useState(null);

  const checkPosition = () => {
    setYPos(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', checkPosition) 
    return () => window.removeEventListener('scroll', checkPosition)
  })


  return (
    <Anim8able
      from={{opacity: 0, transform: 'translate3d(-2%,0px,0)'}} 
      to={{opacity: 1, transform: 'translate3d(0%,0px,0)'}}
      delay={200}
      config={{mass:1, friction: 60, tension: 250}}
    >
      <li className={state === 'overlayOff' ? "overlay--off" : "overlay--on"}>
        <Banner type="thumb" toggleShowOverlay={toggleShowOverlay} mouseInEl={mouseInEl} mouseOutEl={mouseOutEl} title={title} shortDesc={shortDesc} img={img} id={id}/>
      </li>
    </Anim8able>
  )
}

export default ThumbListItem
