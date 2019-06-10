import React from 'react';
import './team_button.scss';

export default (props) => {
    const { colors, team_full_name, team_id, id ,chooseTeam, league_name, isMobile, deleteTeam, logo } = props;
    const backgroundStyle = {'backgroundColor': `${colors}`, 'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(/dist/assets/${logo})`};

        return(
            <div className="container">
                <div className="row">
                    <button onClick={() => {chooseTeam(team_id || id, league_name)}} style={backgroundStyle} className="btn btn-large home-team-button col s12 m9 offset-m1">{team_full_name}</button>
                    {!isMobile && (
                        <button onClick={() => {deleteTeam(id || team_id)}} className="btn btn-large col m1  red darken-3"><i className="material-icons">delete</i></button>
                    )}
                </div>
            </div>
        );
}
