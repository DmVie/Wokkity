import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from '../components/Pages/HomePage/HomePage';
import PageNotFound from '../components/Pages/PageNotFound/PageNotFound';
import RecipePage from '../components/Pages/RecipePage/RecipePage';
import ShoppingListPage from '../components/Pages/ShoppingListPage/ShoppingListPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/shopping-list" component={ShoppingListPage} />
        <Route path="/recipe/:id" component={RecipePage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
