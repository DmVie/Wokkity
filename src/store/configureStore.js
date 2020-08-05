import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import userReducer from '../reducers/user';
import recipeReducer from '../reducers/recipes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      recipes: recipeReducer
    }),
    composeEnhancers(applyMiddleware(thunk)))

   return store;
}