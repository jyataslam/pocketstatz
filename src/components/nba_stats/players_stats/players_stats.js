import React, { Component } from 'react';
import './nba_players_stats.scss';

class PlayerStats extends Component {

    displayPlayersStats(team) {
        const { teamPlayers } = team;
        var result = Object.keys(teamPlayers).map(function(key) {
            return teamPlayers[key];
        });
        const players = result.map((player) => {
            return (
            <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.points}</td>
                <td>{player.triplePoints}</td>
                <td>{player.rebounds}</td>
                <td>{player.assists}</td>
                <td>{player.steals}</td>
            </tr>
            )
        })
        return (
            <div className="players-table nba-stats">
                <table className="striped">
                    <thead id="stats-title">
                        <tr>
                            <th className="player-head-width">PLAYER</th>
                            <th>POS</th>
                            <th>PTS</th>
                            <th>3PTS</th>
                            <th>RBS</th>
                            <th>AST</th>
                            <th>STL</th>
                        </tr>
                    </thead>
                    <tbody>
                       {players}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { view, team1, team2 } = this.props;
        return (
            <div className="center" id="stats-container">
                {view === "left" ? this.displayPlayersStats(team1) : this.displayPlayersStats(team2)}
            </div>
        );
    }

}

export default PlayerStats;