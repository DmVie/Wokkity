import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Action Generators
import { startLogout } from  '../../actions/user';
import { connect } from 'react-redux';

import SlideBox  from '../../services/SlideBox/SlideBox';

const Header = (props) => {

  const [ show, set ] = useState(false)

  return ( 
    <header>
      <div>
        <FontAwesomeIcon icon={['fas','bars']} onClick={() => set(!show)}/>    
      </div>
      <SlideBox  show={show} set={set}>
        <nav className="mob-nav">
          <FontAwesomeIcon icon={['far', 'window-close']} onClick={() => set(false)}/>
          <li><NavLink to="/" onClick={() => set(false)} activeClassName="is-active-link" exact={true}>Home</NavLink></li>
          <li><NavLink to="/recipes" onClick={() => set(false)} activeClassName="is-active-link">Recipes</NavLink></li>
        </nav>
      </SlideBox>
      <div>
      {
        props.isAuthenticated ? (
          <Button className="button button--transparent--red-sides" onClick={props.startLogout}>Log Out</Button>
        ) : (
          <Button className="button button--transparent--red-sides" onClick={() => props.setShowLoginModal(true)}>Log In / Sign Up</Button>
        )
      }

      {
        props.showLoginModal && props.launchSigninModal()
      }

      </div>
    </header>
  )
};


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.uid
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, 
  mapDispatchToProps)(Header)


