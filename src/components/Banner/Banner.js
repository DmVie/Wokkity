import React from 'react'
import './Banner.css';

import Header from '../Header/Header';

const Banner = () => {
  return (
    <div className="banner-container">
      <Header />
      <div>
        <div className="title-wrapper">
          <h1>Wokkiti</h1>  
        </div>        
      </div>      
    </div>
  )
}

export default Banner