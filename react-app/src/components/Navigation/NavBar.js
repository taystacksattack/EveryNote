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
		<div id="whole-nav-bar-wrapper">
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
				{/* <LandingPage isLoaded = {isLoaded}/> */}
				{/* <li>
					<NavLink exact to="/">Trash</NavLink>
				</li>
				<li>
					<NavLink exact to="/">Shared with Me</NavLink>
				</li> */}
			</ul>
			<div id="footer-wrapper">
				<div id="developer-section-wrapper">
					<h3>Developer Links</h3>
					<div id="links-wrapper">
						<p>Carmen Lee</p>
						<div>
							<a href="https://www.linkedin.com/in/carmen-lee-52061690/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/lee2278"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Joshua Lee</p>
						<div>
							<a href="https://github.com/j1jlee/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://linkedin.com/in/jaewon-lee-9573a0142"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Taylor McClerin</p>
						<div>
							<a href="https://www.linkedin.com/in/taylor-mcclerin-059586177/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/taystacksattack"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Roberto Peregrina Jr</p>
						<div>
							<a href="https://www.linkedin.com/in/roberto-peregrina/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/RobertoPeregrinaJr96"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default NavBar;
