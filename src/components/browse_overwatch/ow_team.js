import React from 'react';

export default ({ colors, chooseTeam, id, team_full_name }) => {
    const backgroundColor = {'background-color':`${colors}`}

    return (
        <li onClick={() => {chooseTeam(id)}} style={backgroundColor} className="collection-item team-from-list center s12 m6 flow-text">
            <span className="title">{team_full_name}</span>
        </li>
    )
}