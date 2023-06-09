import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory()
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false)
    history.push('/')
  };

  //original code
  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  //adjustment for logged in vs not logged in
   let ulClassName
  if (!user) ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")
  if (user) ulClassName = "loggedin-dropdown" + (showMenu ? "" : " hidden")

  const closeMenu = () => setShowMenu(false);

  return (
    <>

      <div id = {user? "logged-in-button-wrapper": "logged-out-button-wrapper"}>
        <button id= "profile-button" onClick={openMenu}>
          <i id="user-button" className="fas fa-user-circle" />
        </button>

        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button id='user-logout-btn' onClick={handleLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <div id="drop-down">
              <>
                <OpenModalButton
                  id = "landing-page-buttons"
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />

                <OpenModalButton
                  // className = "landing-page-buttons"
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </>
            </div>
          )}
        </ul>

  </div>
    </>
  );
}

export default ProfileButton;
