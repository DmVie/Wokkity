import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

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

const RecipePage = ({recipe, setRecipeComments}) => {

  const [ averageRating, setAverageRating ] = useState(0)   

  function createMarkup(desc) {
    return {__html: desc}
  }

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
        
      />
      <div className="content-container">
        <article  className="recipe">
          <section dangerouslySetInnerHTML={createMarkup(recipe.desc)} className="desc">
          </section>
          <SwitchBox recipe={recipe}/>
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