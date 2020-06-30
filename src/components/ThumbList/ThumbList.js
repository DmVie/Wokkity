import React from 'react';

import './ThumbList.scss';
import { connect } from 'react-redux';

// Composite Component Imports
import ThumbListItem from '../ThumbListItem/ThumbListItem';

// Action Generators 
import { startSetRecipes} from '../../actions/recipes'

const ThumbList = (props) => {

  return (
   
      <ul className="thumb-list-container">
        {
          props.recipes.length === 0 && (<p>No recipes have been added yet,  we're working on it! :)</p>)
        }
        { 
          props.recipes.map((recipe) => {
            return <ThumbListItem title={recipe.title} img={recipe.bannerImg.med} shortDesc={recipe.shortDesc} key={recipe.id} id={recipe.id}/>
          })
        }
      </ul>
   
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
})

const mapDispatchToProps = (dispatch) => ({
    startSetRecipes: () => dispatch(startSetRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(ThumbList)
