import React, { Component } from 'react';
import Team from './team';
import axios from 'axios';
import Buttons from './confirm_buttons';

class TeamList extends Component {
    state = {
        teams: [],
        selectedTeams: [],
    }

    componentDidMount() {
        this.getTeams();
    }

    chooseTeam = (id) => {
        const { selectedTeams } = this.state;
        this.setState({
            selectedTeams: [...selectedTeams, id]
        });
    }

    async getTeams() {
        const response = await axios.get(`/api/data/getteam.json`);

        if (response.data.success){
            this.setState({
                teams: response.data.teams
            });
        }
    }

    confirmRoute = () => {
        this.props.history.push("/my-teams");
    }

    backToSports = () => {
        this.props.history.push("/browse");
    }

    render() {
        const teamList = this.state.teams.map((team) => {
            return <Team key={team.id} {...team} chooseTeam={this.chooseTeam} />
        });
        const {selectedTeams} = this.state;
        const border = {"border": "none"};

        if (selectedTeams.length === 0){
            return (
                <div className="team-list row">
                    <div className="container">
                        <ul style={border} className="collection team-collection">
                            {teamList}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="team-list">
                    <div className="container">
                    <Buttons confirm={this.confirmRoute} back={this.backToSports}/>
                    <div className="row">
                        <ul style={border} className="collection team-collection">
                            {teamList}
                        </ul>
                    </div>
                    </div>
                </div>
            )
        }  
    }
}

export default TeamList;
