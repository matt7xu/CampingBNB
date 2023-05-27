import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fas fa-id-card" />
      </button>
      {open ? (<ul className="profile-dropdown">
        <li>Username: {user.username}</li>
        <li>Name: {user.firstName} {user.lastName}</li>
        <li>Email: {user.email}</li>
        {/* <li>
          <button onClick={logout}>Log Out
          </button>
        </li> */}
      </ul>) : null}
    </div>
  );
}

export default ProfileButton;
