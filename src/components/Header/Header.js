import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import './Header.scss';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login';
import Modal from '../../services/Modal/Modal';
import Button from '../Button/Button';

// Action Generators
import { startLogout } from  '../../actions/user';
import { connect } from 'react-redux';

const Header = (props) => {

  console.log('Headr props ', props)

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
          <Button className="button button--transparent--red-sides" onClick={() => setShowLoginModal(true)}>Log In</Button>
        )
      }

      {
        showLoginModal && launchSigninModal()
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
