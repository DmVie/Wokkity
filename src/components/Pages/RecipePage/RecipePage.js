import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import './recipePage.css';
import Banner from '../../Banner/Banner'

import SwitchBox from '../../../services/SwitchBox/SwitchBox'
import PictureBox from '../../../services/PictureBox/PictureBox'

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  return null
}

const RecipePage = ({recipe}) => {

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
                recipe.notes.map((item) => <li>{item}</li>)
              }
            </ul>
          </section>
        </article>
      </div>    
    </div>
  )
}

const mapStateToProps = (state, rest) => {
  console.log(state);
  console.log('rest ', rest)
  return {
    recipe: state.recipes.find((recipe) => recipe.id === rest.match.params.id)
  }
}

export default connect(mapStateToProps)(RecipePage)
