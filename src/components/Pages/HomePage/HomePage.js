import React from 'react'

import './HomePage.scss';

import Banner from '../../Banner/Banner';
import ThumbList from '../../ThumbList/ThumbList';

const HomePage = () => {
  return (
    <div class="landing-page-banner">
      <Banner title="Wokkiti" type="page" img="https://wokkiti.s3-ap-southeast-1.amazonaws.com/green-curry1.jpg"/>
      <h2 className="thumb-list-title">Recipes</h2>
      <ThumbList />
    </div>
  )
}

export default HomePage;