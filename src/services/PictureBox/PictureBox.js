import React from 'react'

import './PictureBox.scss';

import SpringCarousel from '../SpringCarousel/SpringCarousel';

const PictureBox = ({images = [], index, ...rest}) => {

  return (
    <section className="picture-box"> 
      <SpringCarousel images={images} index={index} togglePictureBox={rest.togglePictureBox}/>
    </section>
  )
}

export default PictureBox
