import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingChoose from './home_choose_sports';
import BrowseNba from '../browse_teams/index';
import BrowseNhl from '../browse_teams/index';

import './browse_sports.scss';

export default props => {
    return (
        <div className="browse-container">
            <Route path="/browse" exact component={LandingChoose} />

            <Route path="/browse/nba" render={routingProps => {
                return <BrowseNba {...routingProps} />
            }} />
            <Route path="/browse/nhl" render={routingProps => {
                return <BrowseNhl {...routingProps} />
            }} />
        </div>
    )
}