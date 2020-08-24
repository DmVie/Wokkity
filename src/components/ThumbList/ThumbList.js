import React from 'react';

import './ThumbList.scss';

// Composite Component Imports
import ThumbListItem from '../ThumbListItem/ThumbListItem';



const ThumbList = (props) => {

  return (
    <React.Fragment>
      {
        props.recipes.length === 0 && (<p>No recipes found! :(</p>)
      }
      <ul className="thumb-list-container">

        { 
          props.recipes.map((recipe) => {
            return <ThumbListItem title={recipe.title} img={recipe.bannerImg.med} shortDesc={recipe.shortDesc} key={recipe._id} id={recipe._id}/>
          })
        }
      </ul>
      </React.Fragment>
  )
}

export default ThumbList;
