import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import App from './components/App/App';

import { Provider } from 'react-redux';

import { firebase } from './firebase/firebase';

import configureStore from './store/configureStore';

// Composite Component Imports
import LoadingPage from './components/LoadingPage/LoadingPage'; 

// Action Generators
import { login, logout } from './actions/user';
import { startSetRecipes } from './actions/recipes';

const store = configureStore()

let hasRendered = false;

// Start off with the loader
ReactDOM.render(<LoadingPage />, document.getElementById('root'))

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>    
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  hasRendered = true
}

firebase.auth().onAuthStateChanged((user) => {
  if(!user) {
    console.log('Status: Signed Out :(')
    store.dispatch(logout())
    renderApp()
  }else {
    console.log('Status: Signed in :)')
    store.dispatch(login(user.uid))   
  }
})



