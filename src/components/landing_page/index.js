import React from "react";
import { Link } from 'react-router-dom';
import "./landing_page.scss";

export default props => {
    return (
        <div className="landing-container">
            <div className="welcome-header center">
                <img className="welcome-logo col s12 m8 offset-m2" src="/dist/assets/images/logos/pocketstatzlogo.png" alt="LOGO" />
            </div>
            <hr className="first-hr"/>
            <p className="center welcome-text">The Latest Stats From Your Favorite Sports Teams</p>
            <hr className="second-hr"/>
            <section className="landing-buttons">
                <div className="row signup-buttons">
                    <Link to="/account/sign-in" id="landing-btn" className="center btn col s5 offset-s1 hide-on-med-and-up">Log In</Link>
                    <Link to="/account/sign-in" id="landing-btn" className="center btn col m3 offset-m5 hide-on-small-only">Log In</Link>
                    
                </div>
                <div className="row login-buttons">
                <Link to="/account/sign-up" id="landing-btn" className="center btn col m3 offset-m5 hide-on-small-only">Sign Up</Link>
                <Link to="/account/sign-up" id="landing-btn" className="center btn col s5 offset-s2 hide-on-med-and-up">Sign Up</Link>
                </div>

                <div className="row guest-container">
                    <Link to="/browse" id="landing-btn-guest" className="center btn col s5 offset-s4 hide-on-med-and-up">Guest</Link>
                    <Link to="/browse" id="landing-btn-guest" className="center btn col m3 offset-m5 hide-on-small-only">Guest</Link>
                </div>
            </section>
        </div>
    );
}