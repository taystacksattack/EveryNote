import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import '../Navigation/Navigation.css';
import './landing.css'

function LandingPage({ isLoaded }){

        return (
        <>
                <div className = "header-wrapper">
                        {/* <h1>  ...  </h1> */}
                        {isLoaded && (
                                <ProfileButton/>
                                )}
                </div>
                <img id="landing-background" alt="Welcome!" src="https://cdn.discordapp.com/attachments/1102007410014556160/1116370540454756493/EveryNote_Set_up.jpg" />
        </>
	);
}

export default LandingPage;