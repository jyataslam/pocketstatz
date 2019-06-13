import React, { Component, Fragment } from 'react';
import TeamButton from '../team_button/team_button';
import EmptyHomepage from '../empty_homepage';
import DeleteModal from '../delete_confirm_modal';
import axios from 'axios';
import LoadingScreen from '../../loading_screen';
import Swipeout from 'rc-swipeout';
import '../my_team_lists.scss';

class GuestTeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userTeams: null,
            isMobile: false,
            isModalOpen: false,
            deleteTeamId: null,
            deleteTeamName: null
        }

        window.addEventListener('resize', this.checkScreenWidth);
    }
    
    async componentDidMount() {
        await this.getGuestUserTeams();
        this.onLoadCheckScreenWidth();
    }

    checkScreenWidth = (event) => {
        const { outerWidth } = event.target;
        let mobile = outerWidth < 601 ? true : false;
    
        this.setState({
            isMobile: mobile
        })
    }

    onLoadCheckScreenWidth(){
        let mobile = outerWidth < 601 ? true : false;
    
        this.setState({
            isMobile: mobile
        })
    }

    async getGuestUserTeams() {
        let localData = localStorage.homeTeamIds;
        let guestUserTeams = null;
        if (localData) {
            const response = await axios.get("/api/list-user-teams.php", {
                params: {
                    team_ids: localData
                }
            });

            guestUserTeams = response.data.user_teams;
        } else {
            guestUserTeams = [];
        }
        
        this.setState({
            userTeams: guestUserTeams,
        });
    }

    openModal = (id, teamName) => {
        
        this.setState({
            isModalOpen: true,
            deleteTeamId: id,
            deleteTeamName: teamName
        });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    deleteGuestUserTeam = async (id) => {
        let localStorageArr = JSON.parse("[" + localStorage.getItem("homeTeamIds") + "]");
        var index = localStorageArr.indexOf(this.state.deleteTeamId);
        if (index > -1) {
            localStorageArr.splice(index, 1);
            if (localStorageArr.length === 0){
                localStorage.removeItem('homeTeamIds', index);
                this.setState({
                    userTeams: [],
                })
                return
            }
            localStorage.setItem('homeTeamIds', localStorageArr);
            let newTeamsStr = localStorageArr.toString();
            const response = await axios.get("/api/list-user-teams.php", {
                params: {
                    team_ids: newTeamsStr
                }
            });
            this.setState({
                userTeams: response.data.user_teams,
            });
        } 
        this.closeModal();
    }

    goToTeamStats = (teamID, leagueName) => {
        this.props.history.push(`/${leagueName}/${teamID}`);
    }

    goToBrowse = () => {
        this.props.history.push("/browse");
    }

    render() {
        const { userTeams, isMobile, isModalOpen, deleteTeamName } = this.state;
        const deleteIcon = <i class="material-icons">delete</i>;
        if (!userTeams) {
            return <LoadingScreen />
        } else if (userTeams.length) {
            const homepageTeamList = userTeams.map((team) => {
                if (isMobile) {
                    return (
                        <Swipeout
                            right={[
                                {
                                    text: deleteIcon,
                                    // onPress: () => this.deleteGuestUserTeam(team.id),
                                    onPress: () => this.openModal(team.id),
                                    style: { backgroundColor: 'red', color: 'white' },
                                    className: 'custom-class-2'
                                }
                            ]}
                            autoClose = 'true'
                        >
                            <TeamButton key={team.id} {...team} chooseTeam={this.goToTeamStats} isMobile={isMobile}/>
                        </Swipeout>
                    )
                }
                return (
                    <TeamButton key={team.id} {...team} openModal={this.openModal} chooseTeam={this.goToTeamStats} isMobile={isMobile} deleteTeam={this.deleteGuestUserTeam}/>
                );
            });

            return (
                <ul>
                    
                    <div className="team-list-container">
                        {homepageTeamList}
                    </div>
                    <DeleteModal isModalOpen={isModalOpen} closeModal={this.closeModal} deleteTeam={this.deleteGuestUserTeam} teamName={deleteTeamName}/>
                    
                </ul>
            );
        } 
        return <EmptyHomepage goToBrowse={this.goToBrowse} />
    }
}

export default GuestTeamList;