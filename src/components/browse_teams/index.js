import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TeamList from './team_list';
import NBAGameInfo from '../nba_stats';
import NHLGameInfo from '../nhl_stats';
import 'react-toastify/dist/ReactToastify.css';
import './browse.scss';

export default props => {
    return (
        <div id="browse" className="browse-container">
            <Route path="/browse/nba" render={(routingProps) => {
                return <TeamList {...routingProps} leagueName='nba' />
            }} />
            <Route path="/browse/nhl" render={(routingProps) => {
                return <TeamList {...routingProps} leagueName='nhl' />
            }} />
        {/* <div id="teams-main"> */}
            <Route path="/nba/:team_id" render={(routingProps) => {
                return <NBAGameInfo {...routingProps} />
            }} />
            <Route path="/nhl/:team_id" render={(routingProps) => {
                return <NHLGameInfo {...routingProps} />
            }} />
        {/* </div> */}
        </div>
    )
}