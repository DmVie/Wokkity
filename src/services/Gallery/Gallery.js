import React, { useState }  from 'react'
import { useSpring, animated } from 'react-spring';
import './Gallery.scss';
import Modal from '../Modal/Modal';
import PictureBox from '../PictureBox/PictureBox';

const Gallery = ({gallery =[]}) => {

  const [ showGallery, setShowGallery ] = useState(false);
  const [ showPictureBox, setShowPictureBox ] = useState({
    show: false,
    index: null
  })

  const toggleShowGallery = () => {
    if(showGallery) {
      set({transform: 'translateX(-100%)'});
    }else if(!showGallery) {
      set({transform: 'translateX(0%)'})
    }

    setShowGallery(!showGallery)
  }

  const togglePictureBox = (show, index) => {
    setShowPictureBox({
      show,
      index
    });
  }



  const [props, set] = useSpring(() => ({ transform: 'translateX(-100%)', config: { mass: 3, tension: 350, friction: 50 } }))

  return (     
        <animated.div
          style={props} 
          className="gallery-container"
        > 
            {
              gallery.length === 0 && <p>Sorry, we don't have any pictures available yet..</p>
            } 
            <ul className="gallery-list">
              {
                gallery.map((pic, index) => {
                  return (
                  <div key={index}>
                    <li> 
                      <img src={`${pic.square}`} alt={pic.name} />
                    </li>
                    <div className="gallery-vignette" onClick={() => togglePictureBox(true, index)}></div>
                  </div>
                  )
                })
              }
            </ul>
            <div className={`gallery-tab-${showGallery}`} onClick={toggleShowGallery}
            >{showGallery ? 'Close' : 'Gallery'}</div> 
            {showPictureBox.show && ( 
              <Modal>
                <PictureBox images={gallery} index={showPictureBox.index} togglePictureBox={togglePictureBox} />
              </Modal>
            )}            
          </animated.div>
    
    
  )
}

export default Gallery
