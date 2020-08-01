import React, { useRef, useEffect } from 'react';
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SpringCarousel = ({images = [], index, ...rest}) => {

  const internalIndex = useRef(index)

  const [ props, set ] = useSprings(images.length, i => ({ x: i * window.innerWidth, sc: 1}))

  useEffect(() => {
    setTimeout(() => {
      set(i => {
        const x = (i - internalIndex.current) * window.innerWidth;
        return { x, sc: 1 }
      })
    },400)
  }, [set])

  const bind = useGesture(({down, delta: [xDelta], direction: [xDir], distance, cancel}) => {

    if(down && distance > window.innerWidth / 2) {
      internalIndex.current = clamp(internalIndex.current + (xDir > 0 ? -1 : 1), 0, images.length - 1);
      cancel(); // cancel the gesure after dragging half the width
    }

    set(i => {
      const x = (i - internalIndex.current) * window.innerWidth + (down ? xDelta : 0);
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc }
    })
  })

  return props.map(({ x, sc }, i) => (
    <animated.div {...bind()} key={i} style={{transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`)}}>
        <img src={images[i].med} alt={images[i].title} draggable="false" />
        <div className="spring-carousel-img-title">{images[i].name}</div>
        <FontAwesomeIcon icon="window-close" onClick={() => rest.togglePictureBox(false)} />
      </animated.div>
    </animated.div>
  ))  


}

export default SpringCarousel
