import React, { useState } from 'react'

import { Route, Link } from 'react-router-dom';


import './SwitchBox.scss';

import IngredientsList from '../../components/Pages/RecipePage/IngredientsList/IngredientsList';
import PreparationList from '../../components/Pages/RecipePage/PreparationList/PreparationList';
import MethodList from '../../components/Pages/RecipePage/MethodList/MethodList';

const SwitchBox = ({recipe}) => {

  const [state, setState ] = useState('ingredients')

  const pants = (isActiveTab) => {
    setState(isActiveTab)

  } 

  return (
    <section className="switch-box-container">
      <div className="switch-box-header">
        <Link onClick={() => pants('ingredients')} to={`/recipe/${recipe.id}/ingredients`} className={state === 'ingredients' ? "activeTab" : ""}>Ingredients</Link>
        <Link onClick={() => pants('prep')} to={`/recipe/${recipe.id}/preparation`} className={state === 'prep' ? "activeTab" : ""}>Prep</Link>
        <Link onClick={() => pants('method')} to={`/recipe/${recipe.id}/method`} className={state === 'method' ? "activeTab" : ""}>Method</Link>
      </div>
      <section class="switch-box-content">
        <Route path={`/recipe/${recipe.id}/ingredients`}   render={(routeProps) => (
    <IngredientsList {...routeProps} ingredients={recipe.ingredients} />
  )}/>
        <Route path={`/recipe/${recipe.id}/preparation`} render={(routeProps) => (<PreparationList {...routeProps} preparation={recipe.preparation} />) } />
        <Route path={`/recipe/${recipe.id}/method`} render={(routeProps) => (<MethodList {...routeProps} method={recipe.method} />)}/>      
      </section>

    </section>
  )
}

export default SwitchBox
