import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LandingPage from '../LandingPage';
import './Navigation.css';

function NavBar({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	// console.log(sessionUser)

	return (
		<ul className="nav-links">
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			{/* <li>
				<NavLink exact to="/notes">Home</NavLink>
			</li> */}
			<li>
				<NavLink exact to="/notes">Notes</NavLink>
			</li>
			<li>
				<NavLink exact to="/tasks">Tasks</NavLink>
			</li>
			<li>
				<NavLink exact to="/notebooks">Notebooks</NavLink>
			</li>
			<li>
				<NavLink exact to="/tags">Tags</NavLink>
			</li>
			{/* <li>
				<NavLink exact to="/">Trash</NavLink>
			</li>
			<li>
				<NavLink exact to="/">Shared with Me</NavLink>
			</li> */}
		</ul>
	);
}

export default NavBar;
