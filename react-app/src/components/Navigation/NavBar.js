import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LandingPage from '../LandingPage';
import './Navigation.css';

function NavBar({ isLoaded }) {
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

				<li className='li-links'>
					<NavLink className='just-links' exact to="/notes">
						<span className="material-symbols-outlined">description
						</span>
						<span id='navlink-names'>Notes</span>
					</NavLink>
				</li>
				<li className='li-links'>
					<NavLink className='just-links' exact to="/tasks">
						<span className="material-symbols-outlined">task_alt</span>
						<span id='navlink-names'>Tasks</span>
					</NavLink>
				</li>
				<li className='li-links'>
					<NavLink className='just-links' exact to="/notebooks">
						<span className="material-symbols-outlined">auto_stories</span>
						<span id='navlink-names'>Notebooks</span>
					</NavLink>
				</li>
				<li className='li-links'>
					<NavLink className='just-links' exact to="/tags">
						<span className="material-symbols-outlined">sell</span>
						{/* <span className="material-symbols-outlined">sell</span> */}
						<span id='navlink-names'>Tags</span>
					</NavLink>
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
						<div className='dev-links'>
							<a href="https://www.linkedin.com/in/carmen-lee-52061690/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/lee2278"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Joshua Lee</p>
						<div className='dev-links'>
							<a href="https://linkedin.com/in/jaewon-lee-9573a0142"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/j1jlee/"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Taylor McClerin</p>
						<div className='dev-links'>
							<a href="https://www.linkedin.com/in/taylor-mcclerin-059586177/"><i class="fa-brands fa-linkedin"></i></a>
							<a href="https://github.com/taystacksattack"><i class="fa-brands fa-github"></i></a>
						</div>
					</div>
					<div id="links-wrapper">
						<p>Roberto Peregrina Jr</p>
						<div className='dev-links'>
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
