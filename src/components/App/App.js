import React from 'react';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faInfoCircle, faWindowClose, faStar as 
  faStarSolid, faQuoteRight, faQuoteLeft, faUserAstronaut, faPepperHot, faHome, faBars
 } from '@fortawesome/free-solid-svg-icons'
import { faStar, faCommentDots, faClipboard } from '@fortawesome/free-regular-svg-icons';
import Footer  from '../Footer/Footer'
import AppRouter from '../../routers/AppRouter';

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

library.add(faInfoCircle, faWindowClose, faStar, faCommentDots, faClipboard, faStarSolid, faQuoteLeft, faQuoteRight, faUserAstronaut, faPepperHot, faHome, faBars)

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;