import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import '../Navigation/Navigation.css';
import './landing.css'

function LandingPage({ isLoaded }){

        return (
        <>
                <div id = "header-wrapper">
                        {/* <h1>  ...  </h1> */}
                        {isLoaded && (
                                <ProfileButton/>
                                )}
                </div>
                <div id="background-wrapper">
                        <img id="landing-background" alt="Welcome!" src="https://cdn.discordapp.com/attachments/1113247365982330952/1117166249223397518/EveryNote_Set_up_in_black.jpg" />
                        {/* <img id="landing-background" alt="Welcome!" src="https://cdn.discordapp.com/attachments/1102007410014556160/1116446249265139722/EveryNote_Set_up_in_black.jpg" /> */}
                        {/* https://cdn.discordapp.com/attachments/1102007410014556160/1116446249265139722/EveryNote_Set_up_in_black.jpg */}
                </div>
        </>
	);
}

export default LandingPage;
