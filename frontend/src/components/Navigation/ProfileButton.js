import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button">
      <button onClick={openMenu} className="profileButton">
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li className="emailLi">{user.email}</li>
          <li className="manageSpotsDiv">
            <Link to="/owned/spots" style={{color: 'black'}}>Manage Spots</Link>
          </li>
            <li>
              <button className="logoutButton" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <div className="loginSignup">
          <li>
            <LoginFormModal />
          </li>
          <li>
            <SignupFormModal />
          </li>
        </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
