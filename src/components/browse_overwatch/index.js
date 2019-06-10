import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import OWTeamList from './ow_team_list';
import './browse.scss';

export default props => {
    return (
        <div className="browse">
            <Route path="/overwatch" exact component={OWTeamList}/>
        </div>
    )
}