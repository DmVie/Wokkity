import React from 'react'
import { Link } from 'react-router-dom';
import './Banner.scss';

import Header from '../Header/Header';

const Banner = (props) => {
  return (
    <div className={`banner-container ${props.type}`}>
      <img className="banner-bg" src={props.img} alt={props.title} />
      <div className="overlay">
        <BannerOverlayContent {...props} />
      </div>        
    </div>
  )
}



const BannerOverlayContent = (props) => {
  console.log('banner overlay content props ', props)

  if(props.type === 'thumb') {
    return (
      <div>
        <Link to={`recipe/${props.id}/ingredients`}>
          <h2>{props.title}</h2>
          { props.shortDesc && <p>{props.shortDesc}</p> }
        </Link>
      </div>
    )
  } else if (props.type === 'page') {
    return (
      <>
        <Header />
        <div>
          <h1>{props.title}</h1>
        </div>
      </>
    )
  }


}

export default Banner