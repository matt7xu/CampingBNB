import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./logo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="homeNav">
      <li className="navLogo">
        <NavLink exact to="/"><img className="logo" src={logo} alt=""></img></NavLink>
      </li>
      {isLoaded && sessionUser &&(
        <li className="navCreate">
          <NavLink to="/spots/new">Create a new spot</NavLink>
        </li>
      )}
      {isLoaded && (
        <li className="navButton">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
