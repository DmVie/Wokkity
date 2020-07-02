import React, { useState } from 'react';
import './ThumbListItem.scss';

import Banner from '../Banner/Banner';


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

  return (
    <li className={state === 'overlayOff' ? "overlay--off" : "overlay--on"}>
      <Banner type="thumb" toggleShowOverlay={toggleShowOverlay} mouseInEl={mouseInEl} mouseOutEl={mouseOutEl} title={title} shortDesc={shortDesc} img={img} id={id}/>
    </li>
  )
}

export default ThumbListItem
