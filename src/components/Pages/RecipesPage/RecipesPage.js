import React from 'react';
import { connect } from 'react-redux';

import Banner from '../../Banner/Banner';

import './RecipesPage.scss';

const RecipesPage = (props) => {
  return (
    <React.Fragment>
      <Banner 
        title="Recipes" 
        type="siteBanner" 
        img="https://wokkiti.s3-ap-southeast-1.amazonaws.com/20200701_173803+(3)+(1).jpg"
        {...props}
        />
      <div className="content-container">
      </div>    
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
})

export default connect(mapStateToProps)(RecipesPage)
