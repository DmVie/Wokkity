import React, { useEffect } from 'react';

import './RecipeList.css';
import { connect } from 'react-redux';

// Composite Component Imports
import RecipeListItem from '../RecipeListItem/RecipeListItem';

// Action Generators 
import { startSetRecipes} from '../../actions/recipes'

const RecipeList = (props) => {

  console.log(props)

  useEffect(() => {
    props.startSetRecipes()
  }, [])


  return (
    <div>
      <h1 className="recipe-list-title">Recipes</h1>
      <ul className="recipe-list-container">
        {
          props.recipes.length === 0 && (<p>No recipes have been added yet,  we're working on it! :)</p>)
        }
        {
 
          props.recipes.map((recipe) => {
            return <RecipeListItem {...recipe} key={recipe.id}/>
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
})

const mapDispatchToProps = (dispatch) => ({
    startSetRecipes: () => dispatch(startSetRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
