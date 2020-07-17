import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import './recipePage.css';
import Banner from '../../Banner/Banner';
import Comments from '../../Comments/Comments';
import SwitchBox from '../../../services/SwitchBox/SwitchBox'

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  return null
}



const RecipePage = ({recipe}) => {


  useEffect(() => {
    // do an async call to get comments count and first up to 10 entries 
  },[])
  
  function createMarkup(desc) {
    return {__html: desc}
  }
 
  return (
    <div>
      <ScrollToTopOnMount />
      <Banner  type="page" img={recipe.bannerImg.med} title={recipe.title} gallery={recipe.imgs}/>
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
          <Comments />
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

export default connect(mapStateToProps)(RecipePage)
