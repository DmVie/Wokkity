import React from 'react';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Footer  from '../Footer/Footer'

import AppRouter from '../../routers/AppRouter';
library.add(faInfoCircle)

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
