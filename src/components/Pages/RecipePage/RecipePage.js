import React from 'react'
import { connect } from 'react-redux';

import './recipePage.css';
import Banner from '../../Banner/Banner'

import SwitchBox from '../../../services/SwitchBox/SwitchBox'
import PictureBox from '../../../services/PictureBox/PictureBox'

const RecipePage = ({recipe}) => {

  function createMarkup(desc) {
    return {__html: desc}
  }
 
  return (
    <div>
      <Banner  type="page" img={recipe.img} title={recipe.title}/>
      <div className="content-container">
        <article  className="recipe">
          <section dangerouslySetInnerHTML={createMarkup(recipe.desc)} className="desc">
          </section>
          <SwitchBox recipe={recipe}/>
          {recipe.gallery && recipe.gallery.length > 0 && <PictureBox images={recipe.gallery} />}
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
  return {
    recipe: state.recipes.find((recipe) => recipe.id === rest.match.params.id)
  }
}

export default connect(mapStateToProps)(RecipePage)
