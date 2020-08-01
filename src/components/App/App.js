import React from 'react';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faInfoCircle, faWindowClose, faStar as 
  faStarSolid, faQuoteRight, faQuoteLeft, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Footer  from '../Footer/Footer'
import AppRouter from '../../routers/AppRouter';

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

library.add(faInfoCircle, faWindowClose, faStar, faStarSolid, faQuoteLeft, faQuoteRight, faUserAstronaut)

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;