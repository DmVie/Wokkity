import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import IngredientsList from './IngredientsList/IngredientsList';
import PreparationList from './PreparationList/PreparationList';
import MethodList from './MethodList/MethodList';
import './recipePage.css';
import Banner from '../../Banner/Banner';
import Comments from '../../../services/Commenter/Comments/Comments';

import SwitchBox from '../../../services/SwitchBox/SwitchBox'

// Actions
import { setRecipeComments } from '../../../actions/recipes';
import getAverageRating from '../../../services/StarSystem/getAverageRating';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  return null
}

const RecipePage = ({recipe, setRecipeComments, ...rest}) => {


  const [ averageRating, setAverageRating ] = useState(0)
  const [state, setState ] = useState('ingredients')

  const activeTab = (isActiveTab) => {
    setState(isActiveTab)
  } 
  

  function createMarkup(desc) {
    return {__html: desc}
  }

  const switchBoxLinks = [
    <Link onClick={() => activeTab('ingredients')} to={`/recipe/${recipe._id}/ingredients`} className={state === 'ingredients' ? "activeTab" : ""}>Ingredients</Link>,
    <Link onClick={() => activeTab('prep')} to={`/recipe/${recipe._id}/preparation`} className={state === 'prep' ? "activeTab" : ""}>Prep</Link>,
    <Link onClick={() => activeTab('method')} to={`/recipe/${recipe._id}/method`} className={state === 'method' ? "activeTab" : ""}>Method</Link>
  ]         

  const switchBoxRoutes = [
    <Route path={`/recipe/${recipe._id}/ingredients`}   render={(routeProps) => (
      <IngredientsList {...routeProps} ingredients={recipe.ingredients} />
    )}/>,
    <Route path={`/recipe/${recipe._id}/preparation`} render={(routeProps) => (<PreparationList {...routeProps} preparation={recipe.preparation} />) } />,
    <Route path={`/recipe/${recipe._id}/method`} render={(routeProps) => (<MethodList {...routeProps} method={recipe.method} />)}/> 
  ]
  
  

  useEffect(() => {
    if(recipe.comments === undefined) {
      fetch(`/api/v1/comments/${recipe._id}`)
        .then((jsonData) => { return jsonData.json()})
        .then((comments) => {
          setRecipeComments(recipe._id, comments)  
          setAverageRating(getAverageRating(comments))
        })
        .catch((e) => console.log(e.message))
    }else {
      setAverageRating(getAverageRating(recipe.comments))
    }
    
  },[recipe.comments])


  return (
    <div>
      <ScrollToTopOnMount />
      <Banner  
        type="page" 
        img={recipe.bannerImg.med} 
        title={recipe.title} 
        gallery={recipe.imgs} 
        rating={averageRating}
        noOfRatings={recipe.comments && (recipe.comments.filter((comment) => comment.rating > 0).length)}
        routeProps={{match: rest.match, history: rest.history}}
      />
      <div className="content-container">
        <article  className="recipe">
          <section dangerouslySetInnerHTML={createMarkup(recipe.desc)} className="desc">
          </section>
          <SwitchBox switchBoxLinks={switchBoxLinks} switchBoxRoutes={switchBoxRoutes} />
          <section className="notes">
            <h2>General Notes</h2>
            <hr />
            <ul>
              {
                recipe.notes.map((item, index) => <li key={index}>{item}</li>)
              }
            </ul>
          </section>
          <Comments id={recipe._id} comments={recipe.comments} />
        </article>
      </div>    
    </div>
  )
}


const mapStateToProps = (state, rest) => {
  return {
    recipe: state.recipes.find((recipe) => recipe._id === rest.match.params.id)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setRecipeComments: (id, comments) => dispatch(setRecipeComments(id, comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)