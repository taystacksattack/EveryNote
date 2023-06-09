import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LandingPage from '../LandingPage';
import NavBar from './NavBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	// console.log(sessionUser)

	return (
		<div>
			{isLoaded && sessionUser? <NavBar isLoaded = {isLoaded}/> : <LandingPage isLoaded = {isLoaded}/>}

			{/* {isLoaded && sessionUser ? <NavBar isLoaded = {isLoaded}/> : null } */}


		</div>
	);
}

export default Navigation;
