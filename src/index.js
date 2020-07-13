import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import App from './components/App/App';

import { Provider } from 'react-redux';

import { firebase } from './firebase/firebase';

import configureStore from './store/configureStore';

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
    const unsubscribe = store.subscribe(() => {
      // Without this method there was a problem if you navigated to a recipe directly via the url eg: http://localhost:3000/recipe/5eff8003158bac1fa452921f/.  the state would be empty in mapStateToProp.  This seems to be because the page was rendered and connected to the store before the reducer had set the store. Running the render code inside subscribe callback has fixed this, although the initial page load is slightly longer... but it also fixes the issue that the page would render before the recipeslist 
      console.log(store.getState());
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
    console.log('Status: Signed Out :(')
    store.dispatch(logout())
    renderApp()
  }else {
    console.log('Status: Signed in :)')
    store.dispatch(login(user.uid))   
    renderApp();
  }
})



