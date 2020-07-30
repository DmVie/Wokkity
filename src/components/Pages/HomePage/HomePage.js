import React from 'react'

import './HomePage.scss';

import Banner from '../../Banner/Banner';
import ThumbList from '../../ThumbList/ThumbList';

const HomePage = (props) => {
  return (
    <div className="landing-page">
      <Banner 
        title="Wokkiti" 
        type="siteBanner" 
        img="https://wokkiti.s3-ap-southeast-1.amazonaws.com/recipes/Thai+Green+Curry+Soup/Green-Curry1-aspect-ratio-large.jpg"
        routeProps={props}
        />
      <section className="page-content">
        <h2 className="thumb-list-title">Recipes</h2>
        <ThumbList />
      </section>
    </div>
  )
}

export default HomePage;