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
        {...props}
        />
      <section className="page-content">
 
        <h2 className="thumb-list-title">Recipes</h2>
        <ThumbList />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 48" fill="none">
      <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
    </svg>
    </div>

  
  )
}

export default HomePage;