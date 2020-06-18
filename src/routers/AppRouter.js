import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import HomePage from '../components/HomePage/HomePage';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import ShoppingList from '../components/ShoppingList/ShoppingList';


export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomePage} exact={true}/>
        <Route path="/shopping-list" component={ShoppingList} />
        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
