import React from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated, config } from 'react-spring'

import './SlideBox.scss';

/*
  @param           show     Boolean       To show or hide the slidebox.
  @param  toggleSlideBox    function,     Toggles show prop on click of a button
  @param        children    HTML          The html to be rendered in slidebox
*/
const SlideBox = ({show, set, children}) => {

  const transitions = useTransition(show, null, {
    from: {transform: 'translateX(-100%)'},
    enter: {transform: 'translateX(0%)'},
    leave: {transform: 'translateX(-100%)'},  
    config: { mass: 1, tension: 200, friction: 20 }
  })

  const renderSlideBox = () => {
      return (
        <div>
          {transitions.map(({ item, key, props }) =>
          item && 
          <animated.div key={key} style={props} className="slide-box">
            {children}          
          </animated.div>
          )
        }
        </div>
    
      )
    
  }
  return ReactDOM.createPortal(renderSlideBox(), document.querySelector('body'))
}

export default SlideBox 