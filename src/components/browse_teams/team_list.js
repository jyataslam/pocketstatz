import React, { Component } from 'react';
import Team from './team';
import axios from 'axios';
import Button from './confirm_buttons';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { teamList, loadStart, loadEnd } from "../../actions";
import LoadingScreen from "../loading_screen";
import 'react-toastify/dist/ReactToastify.css';

class TeamList extends Component {
    state = {
        teams: null,
        selectedTeams: [],
        have3Teams: false
    }

    notify = async () => toast.error('Please log in or sign up to add more than three teams to your list.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });

    alert = async () => toast.warn('Warning: You already have three teams saved. Please log in or sign up to save more.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });

    async componentDidMount() {
        this.props.loadStart();
        await this.props.teamList(this.props);
        this.props.loadEnd();

        this.checkLocalStorageTeams();
    }

    checkLocalStorageTeams = async () => {
        const resp = await axios.get(`/api/login-status.php`);
        const { success, user_id } = resp.data;
        if (success) {
            return
        }
        else {
            if (localStorage.getItem("homeTeamIds") !== null) {
                let currentHomeTeams = JSON.parse("[" + localStorage.getItem("homeTeamIds") + "]");
                if (currentHomeTeams.length === 3) {
                    this.alert();
                    this.setState({
                        have3Teams: true
                    });
                }
            }
        }
    }

    componentWillUnmount() {
        this.props.loadStart();
    }

    chooseTeam = (id) => {
        const { selectedTeams } = this.state;
        if (selectedTeams.includes(id)) {
            const teamsArray = [...this.state.selectedTeams];
            const index = teamsArray.indexOf(id);
            teamsArray.splice(index, 1);
            this.setState({
                selectedTeams: teamsArray,
                clicked: false
            });
        } else {
            this.setState({
                selectedTeams: [...selectedTeams, id],
                clicked: true
            });
        }
    }

    checkUserLoggedIn = async () => {
        const resp = await axios.get(`/api/login-status.php`);
        const { success, user_id } = resp.data;
        if (success) {
            this.goToMyTeamsSignedInUser(user_id);
        }
        else {
            this.goToMyTeamsGuest();
        }
    }

    goToMyTeamsSignedInUser = async (userId) => {
        const sendTeamIds = this.state.selectedTeams.toString();

        await axios.get(`/api/addteam.php?user_id=${userId}&team_id=${sendTeamIds}`);
        this.props.history.push(`/user-teams`);
    }

    goToMyTeamsGuest = async () => {
        const sendTeamIds = this.state.selectedTeams.toString();
        const homeTeamsResponse = await axios.get("/api/list-user-teams.php", {
            params: {
                team_ids: sendTeamIds
            }
        });

        let homeTeamsIds = [];
        let currentLength = null;

        if (localStorage.getItem("homeTeamIds") !== null) {
            homeTeamsIds = JSON.parse("[" + localStorage.getItem("homeTeamIds") + "]");
            currentLength = homeTeamsIds.length;
        }

        for (var index = 0; index < homeTeamsResponse.data.user_teams.length; index++) {
            //prevents the user from adding duplicate teams
            if (!homeTeamsIds.includes(homeTeamsResponse.data.user_teams[index].id)) {
                homeTeamsIds.push(homeTeamsResponse.data.user_teams[index].id);
            }
            if (localStorage.getItem("homeTeamIds") === null) {
                localStorage.setItem("homeTeamIds", homeTeamsIds);
            }
        }

        if (homeTeamsIds.length > 3) {
            this.notify();
            homeTeamsIds.length = currentLength;
        } else {
            localStorage.homeTeamIds = homeTeamsIds.toString();
            this.props.history.push(`/user-teams`);
        }
    }

    forceGoToMyTeamsGuest = () => {
        this.props.history.push(`/user-teams`);
    }

    checkStats = (id) => {
        this.props.history.push(`/${this.props.leagueName}/${id}`);
    }

    render() {
        const leagueName = this.props.match.path.slice(-3);

        if (!this.props.teams[leagueName]) {
            return <LoadingScreen />
        }
        else {
            const teamsList = this.props.teams[leagueName].map((team) => {
                if (this.state.selectedTeams.includes(team.id)) {
                    return <Team key={team.id} {...team} chooseTeam={this.chooseTeam} checkStats={this.checkStats} selected={true} have3Teams={this.state.have3Teams}/>
                }
                return <Team key={team.id} {...team} chooseTeam={this.chooseTeam} checkStats={this.checkStats} have3Teams={this.state.have3Teams} />
            });
            const border = { "border": "none" };

            return (
                <div id="teams" className="team-list row">
                    <div id="teams-collection" className="container row">
                        <div>
                            <ToastContainer className="toast-container" />
                        </div>
                        <Button checkUserLoggedIn={this.checkUserLoggedIn} selectedTeams={this.state.selectedTeams} have3Teams ={this.state.have3Teams} goToGuestTeams={this.forceGoToMyTeamsGuest}/>
                        <div style={border}>
                            {teamsList}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        teams: state.listOfTeams.teams,
        clicked: state.listOfTeams.clicked
    }
}

export default connect(mapStateToProps, {
    teamList, loadStart, loadEnd
})(TeamList);
