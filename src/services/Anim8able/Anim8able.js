import React, {useEffect,  useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring';

const Anim8able = (props) => {

  const [ inViewState, setInViewState ] = useState(false);
  const delay = props.delay || 0
  const config = props.config
  const [ spring, setSpring ] = useSpring(() => ({from: props.from}))
  const revert = props.revert || false

  const element = useRef(null)

  useEffect(() => {
    let stats = element.current.getBoundingClientRect()
    
    checkAnim8able(checker, stats)
  })

  const checkAnim8able = (fn, stats) => {
    const inViewPort = fn(stats)
    if(!inViewState && inViewPort) { // if the current state holds not in view and inViewPort reports true hen element has just entered view port 
      setInViewState(true)
      setSpring({to: props.to, delay, config})
    }
    if(inViewState && !inViewPort) {  // current state is in the view but they've just left, setState to false, and reverse animation
      setInViewState(false)
      revert && setSpring({to: props.from})
    }
  }
  const checker = (stats) => stats.y > 0  && stats.y < window.innerHeight

  return (
    <animated.div style={{...spring, ...props.elStyles}} className={props.elClass} ref={element} >
      {props.children}
    </animated.div>
  )
} 

export default Anim8able;