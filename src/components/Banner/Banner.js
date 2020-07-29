import React from 'react'
import { Link } from 'react-router-dom';
import './Banner.scss';
import Gallery from '../../services/Gallery/Gallery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../Header/Header';
import StarSystem from '../../services/StarSystem/StarSystem';

/* A Banner is just an image that covers an element, there are 3 types
  1: The main site banner ( ie the landing page picture ).
  2: Recipe thumbnails also have a banner img clicking them takes you to the recipe page.
  3: The recipe page banner at the top of each recipe page

  Recipe thumbnail banners have additional functionality with an overlay that on hover wll display information about the recipe.

  The individual recipe pages banner will have a tab that allows for sliding a gallery in on top of the banner.  


*/

const Banner = (props) => {
  return (
    <div className={`banner-container ${props.type}`}>
      {props.type === 'thumb' && <FontAwesomeIcon onClick={props.toggleShowOverlay} icon="info-circle" />}
      {props.type === "page" && props.type !== "siteBanner" && <Gallery gallery={props.gallery}/>}
      <img className="banner-bg" src={props.img} alt={props.title} />
      <div className="vignette">
        <BannerOverlayContent {...props} />    
      </div>        
    </div>
  )
}


const BannerOverlayContent = (props) => {
  if(props.type === 'thumb') {
    return (
      <Link to={`recipe/${props.id}/ingredients`} onMouseEnter={props.mouseInEl} onMouseLeave={props.mouseOutEl}>
        <h2>{props.title}</h2>
        <div className="overlay">
          <div>      
            <h2>{props.title}</h2>      
            { props.shortDesc && <p>{props.shortDesc}</p> }
          </div>
        </div>
      </Link>
      
    )
  } else if (props.type === 'page' || props.type === 'siteBanner') {
    return (
      <>
        <Header routeProps={props.routeProps} />
        <h1>{props.title}</h1>
         {props.type === 'page' &&  props.noOfRatings > 0 && (
           <StarSystem 
            rating={props.rating} 
            noOfRatings={props.noOfRatings} 
            type="groupAverage" />
          )
         }
           
      </>
    )
  }


}

export default Banner