import React from 'react';
import './RecipeListItem.css';

const RecipeListItem = (props) => {

  console.log(props)


  return (
    <li>
      <a href="#">
        <img src={props.img} alt={props.title} />
      </a>
      <div class="thumb-overlay">
        <a href="#">
          <h2>{props.title}</h2>
          <small>{props.shortDesc}</small>
        </a>
      </div>
    </li>
  )
}

export default RecipeListItem
