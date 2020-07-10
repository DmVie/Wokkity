import React from 'react';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faInfoCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Footer  from '../Footer/Footer'

import AppRouter from '../../routers/AppRouter';
library.add(faInfoCircle, faWindowClose)

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
