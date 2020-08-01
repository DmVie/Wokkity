import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from '../components/Pages/HomePage/HomePage';
import PageNotFound from '../components/Pages/PageNotFound/PageNotFound';
import RecipePage from '../components/Pages/RecipePage/RecipePage';

import Modal from '../services/Modal/Modal';
import Auth from '../components/Auth/Auth';

const AppRouter = () => {

  const [ showLoginModal, setShowLoginModal ] = useState(false);

  const cancelLoginModal = () => {
    document.querySelector('#root').style.filter='none';
    setShowLoginModal(false)
  }

  const launchSigninModal = () => {
    document.querySelector('#root').style.filter='blur(2px)';
    return (
      <Modal >
        <Auth cancelLoginModal={cancelLoginModal}/>
      </Modal>
    )
  }


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => <HomePage {...props} cancelLoginModal={cancelLoginModal} launchSigninModal={launchSigninModal}  setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} /> } exact/>
        <Route path="/recipe/:id" render={(props) => <RecipePage {...props} cancelLoginModal={cancelLoginModal} launchSigninModal={launchSigninModal}  setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} /> }  />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter;