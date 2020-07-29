import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Auth from '../components/Auth/Auth';
import HomePage from '../components/Pages/HomePage/HomePage';
import PageNotFound from '../components/Pages/PageNotFound/PageNotFound';
import RecipePage from '../components/Pages/RecipePage/RecipePage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/recipe/:id" component={RecipePage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
