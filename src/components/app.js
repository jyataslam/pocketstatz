import React, { Component } from 'react';
import Nav from './nav';
import { Route, Switch } from 'react-router-dom';
import BrowseSports from './browse_sports';
import BrowseNba from './browse_teams/index';
import BrowseNhl from './browse_teams/index';
import UserTeamList from './my_team_lists/user';
import GuestTeamList from './my_team_lists/guest';
import NavFooter from './nav/nav_footer';
import LandingPage from "./landing_page";
import About from './about_page';
import AccountRoutes from "./account";

import auth from '../hoc/auth';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';


class App extends Component {

    render() {
        return (
            <div className="app-wrapper">
                <Nav />
                
                    <Switch>
                        <Route path="/" exact component={LandingPage} />
                        <Route path="/browse" render={(routingProps) => {
                            return <BrowseSports {...routingProps} />
                        }} />
                        <Route path="/user-teams" component={auth(UserTeamList, '/guest-teams', true)} />
                        <Route path="/guest-teams" component={GuestTeamList} />
                        <Route path="/nba" component={BrowseNba} />
                        <Route path="/nhl" component={BrowseNhl} />
                        <Route path="/about" component={About} />
                        <Route path="/account" component={AccountRoutes} />
                    </Switch>
                
                {/* <div className="navbar-fixed hide-on-med-and-up">
                    <NavFooter />
                </div> */}
            </div>
        )
    }
}

export default App;
