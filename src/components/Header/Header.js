import React from 'react'
import './Header.scss'

import { Link } from 'react-router-dom';

import Button from '../Button/Button';

// Action Generators
import { startLogin, startLogout } from '../../actions/user';
import { connect } from 'react-redux';

const Header = (props) => {

  const startLogin = () => {
    props.startLogin()
  }

  const startLogout = () => {
    props.startLogout();
  }

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
          <Button text="Log Out" onClick={startLogout} />
        ) : (
          <Button text="Log In" onClick={startLogin} />
        )
      }
        
      </div>
    </header>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.uid
})

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, 
  mapDispatchToProps)(Header)
