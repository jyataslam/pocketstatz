import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Sidenav from './sidenav';
import './nav.scss';

class Nav extends Component {

    state= {
        authLinks: [
            {
                to: "/account/sign-out",
                text: "Sign Out"
            }
        ],
        guestLinks: [
            {
                to: "/account/sign-in",
                text: "Log In"
            },
            {
                to: "/account/sign-up",
                text: "Sign Up"
            }
        ]
    };

    buildLinks(link, index){
        return(
            <Fragment key={index}>
            <li className="sidenav-close">
                <Link to={link.to}>{link.text}</Link>
            </li>
            <li><div className="divider red"></div></li>
            </Fragment>
        );
    }
    
    renderLinks(){
        const {userAuth} = this.props;
        const {authLinks, guestLinks} = this.state;
        let navLinks = null;

        if(userAuth)
        {
            navLinks = authLinks.map(this.buildLinks);
        }
        else
        {
            navLinks = guestLinks.map(this.buildLinks); 
        }

        return (
            <Fragment>
                {/* <button className="sidenav-close right hide-on-med-and-up">
                    <i className="material-icons">close</i>
                </button> */}
                <li className="first-li sidenav-close">
                    <Link to="/user-teams">My Teams</Link>
                </li>
                <li ><div className="divider red"></div></li>
                <li  className="sidenav-close">
                    <Link to="/browse">Browse</Link>
                </li>
                <li><div className="divider red"></div></li>
                {navLinks}

                <li className="sidenav-close">
                    <Link to="/about">Meet The Creators</Link>
                </li>
            </Fragment>
        )
    }

    render(){
        const links = this.renderLinks();
        const headerColor = {'backgroundColor': '#34364e'};

        return (
            <Fragment>
                <nav style={headerColor} className="nav-head">
                    <div className="nav-wrapper">
                        <a href="/"><span className="header-text brand-logo" >Pocket Statz</span></a>
                        <a href="#" data-target="sidenav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down desktop-nav">
                            {links}
                        </ul>
                    </div>
                </nav>
                    <Sidenav links={links} />
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {  
        userAuth: state.user.auth
    }
}

export default connect(mapStateToProps, {})(Nav);
