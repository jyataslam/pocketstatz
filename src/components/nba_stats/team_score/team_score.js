import React from 'react';
import "./team_score.scss";

function checkTeamAcronym(teamName) {
    switch (teamName) {
        case "BRO":
            return "BKN";
        case "OKL":
            return "OKC";
        default:
            return teamName;
    }
}

export default ({ team1, team2, gameDetails }) => {
    var currentQuarter = "FINAL";

    if (gameDetails.gameStatus === "LIVE" && !gameDetails.currentQuarter) {
        currentQuarter = "Game Starting Soon";
    }
    if (gameDetails.currentQuarter) {
        currentQuarter = "Q" + gameDetails.currentQuarter;
    }
    if (gameDetails.currentQuarter > 4) {
        currentQuarter = "OT" + (gameDetails.currentQuarter - 4);
    }
    if (gameDetails.currentIntermission) {
        currentQuarter = "End of Q" + gameDetails.currentIntermission;
    }
    if (gameDetails.currentIntermission > 4) {
        currentQuarter = "End of OT" + (gameDetails.currentIntermission - 4);
    }

    var minutesRemaining = Math.floor(gameDetails.quarterTimeRemaining / 60);
    var secondsRemaining = gameDetails.quarterTimeRemaining % 60;

    if (secondsRemaining < 10) {
        secondsRemaining = "0" + secondsRemaining;
    }

    var timeRemaining = minutesRemaining + ":" + secondsRemaining;

    if (minutesRemaining === 0 && secondsRemaining === '00') {
        timeRemaining = "";
    }
    if (gameDetails.gameStatus === "COMPLETED" || gameDetails.gameStatus === "COMPLETED_PENDING_REVIEW") {
        timeRemaining = "";
    }

    return (
        <div className="container" id="team-score">
            <div className="center col s12" id="date">{gameDetails.gameDate}</div>
            <div className="row" id="teams">
                <div className="teamName col s6 center">{checkTeamAcronym(team1.teamName)}</div>
                <div className="teamName col s6 center">{checkTeamAcronym(team2.teamName)}</div>
            </div>
            <div className="row" id="scores">
                <div className="teamName col s6 center">{team1.teamScore}</div>
                <div className="teamName col s6 center">{team2.teamScore}</div>
            </div>
            <div className="center" id="quarter">{currentQuarter}</div>
            <div className="center" id="time">{timeRemaining}</div>
        </div>
    );
}
