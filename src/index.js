import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import App from './components/App/App';

import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import configureStore from './store/configureStore';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// Composite Component Imports
import LoadingPage from './components/Pages/LoadingPage/LoadingPage'; 

// Action Generators
import { login, logout } from './actions/user';

import { startSetRecipes } from './actions/recipes'

const store = configureStore()

let hasRendered = false;

// Start off with the loader
ReactDOM.render(<LoadingPage />, document.getElementById('root'))
const renderApp = () => {

  if(!hasRendered) {
    store.dispatch(startSetRecipes())
    store.subscribe(() => {
      // Without this method there was a problem if you navigated to a recipe directly via the url eg: http://localhost:3000/recipe/5eff8003158bac1fa452921f/.  the state would be empty in mapStateToProp.  This seems to be because the page was rendered and connected to the store before the reducer had set the store. Running the render code inside subscribe callback has fixed this, although the initial page load is slightly longer... On a separate note, it also fixes the issue that the home page would render before the recipeslist had been fetched
      // console.log(store.getState());
      ReactDOM.render(
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>    
        </React.StrictMode>,
        document.getElementById('root')
      )
    })        
    hasRendered = true    
  }
}

firebase.auth().onAuthStateChanged((user) => {
  
  if(!user) {
    store.dispatch(logout())
    renderApp()
  }else {
    user.getIdToken(true).then((idToken) => {
      if(user.displayName) {
        fetch('/api/v1/users/verifyUser', {
          method: 'POST',
          // credentials: 'include',
          body: JSON.stringify({
            token: idToken, 
            email: user.email,
            username: user.displayName,
            avatar: user.photoURL
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      }
    });
    store.dispatch(login(user.uid))   
    renderApp();
  }
})



