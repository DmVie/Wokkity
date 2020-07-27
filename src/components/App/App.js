import React from 'react';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faInfoCircle, faWindowClose, faStar as 
  faStarSolid, faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Footer  from '../Footer/Footer'

import AppRouter from '../../routers/AppRouter';
library.add(faInfoCircle, faWindowClose, faStar, faStarSolid, faQuoteLeft, faQuoteRight)

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;