import React, { Component } from 'react';
import Nav from './nav';
import { Route, Switch } from 'react-router-dom';
import BrowseSports from './browse_sports';
import BrowseNba from './browse_teams/index';
import HomeTeamList from './home_team_list';
import LogIn from './log_in';
import GameInfo from './stats';
import NavFooter from './nav/nav_footer';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';


class App extends Component {
    render() {
        return (
            <div>
                <div className="navbar-fixed">
                <Nav />
                </div>
                <div className="container">
                    <Switch>
                        <Route path="/browse" render={(routingProps) => {
                            return <BrowseSports {...routingProps} />
                        }} />
                        <Route path="/my-teams" component={HomeTeamList} />
                        <Route path="/nba" component={BrowseNba} />
                        <Route path="/log-in" component={LogIn} />
                    </Switch>
                </div>
                <div className="navbar-fixed">
                <NavFooter/>
                </div>
            </div>
        )
    }
}

export default App;
