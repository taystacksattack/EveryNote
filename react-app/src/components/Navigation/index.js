import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import LandingPage from '../LandingPage';
import NavBar from './NavBar';
import './Navigation.css';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	// console.log(sessionUser)

	return (
		<div id="wrapper-for-navbar-ternary">
			{/* {isLoaded && sessionUser? <NavBar isLoaded = {isLoaded}/> : <LandingPage isLoaded = {isLoaded}/>} */}
			{/* {isLoaded && sessionUser ? <NavBar isLoaded = {isLoaded}/> : null } */}
			{isLoaded && sessionUser? <NavBar isLoaded = {isLoaded}/> : <ProfileButton/>}

		</div>
	);
}

export default Navigation;
