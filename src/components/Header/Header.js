import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import Button from '../Button/Button';

// Action Generators
import { startLogout } from  '../../actions/user';
import { connect } from 'react-redux';

const Header = (props) => {

  return ( 
    <header>
      <div>
        <Link to="/">
          <img src="https://wokkiti.s3-ap-southeast-1.amazonaws.com/wok.png" alt="wok" />
        </Link>
      </div>
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


