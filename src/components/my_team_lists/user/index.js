import React, { Component, Fragment } from 'react';
import LoadingScreen from '../../loading_screen';
import TeamButton from '../team_button/team_button';
import EmptyHomepage from '../empty_homepage';
import DeleteModal from '../delete_confirm_modal';
import Swipeout from 'rc-swipeout';
import '../my_team_lists.scss';
import { connect } from 'react-redux';
import { getUserTeams, deleteUserTeam } from '../../../actions';

class UserTeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
            checkingScreenWidth: true,
            userTeams: null,
            isModalOpen: false,
            deleteTeamId: null,
            deleteTeamName: null
        }

        window.addEventListener('resize', this.checkScreenWidth);
    }

    async componentDidMount() {
        await this.props.getUserTeams();
        this.onLoadCheckScreenWidth();
    }

    checkScreenWidth = (event) => {
        const { outerWidth } = event.target;
        let mobile = outerWidth < 601 ? true : false;

        this.setState({
            isMobile: mobile
        })
    }

    handleDeleteTeam = async () => {
        await this.props.deleteUserTeam(this.state.deleteTeamId)
        this.props.getUserTeams();
        this.closeModal();
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

    onLoadCheckScreenWidth() {
        let mobile = outerWidth < 601 ? true : false;

        this.setState({
            isMobile: mobile,
            checkingScreenWidth: false
        })
    }

    goToTeamStats = (teamID, leagueName) => {
        this.props.history.push(`/${leagueName}/${teamID}`);
    }

    goToBrowse = () => {
        this.props.history.push("/browse");
    }

    render() {
        const { userTeams } = this.props;
        const { isMobile, checkingScreenWidth, isModalOpen, deleteTeamName } = this.state;
        const deleteIcon = <i className="material-icons">delete</i>;
        if (!userTeams || checkingScreenWidth) {
            return <LoadingScreen />
        } else if (userTeams.length) {
            const homepageTeamList = userTeams.map((team, index) => {
                if (isMobile) {
                    return (
                        <Swipeout
                            key={index}
                            right={[
                                {
                                    text: deleteIcon,
                                    onPress: () => this.openModal(team.team_id),
                                    style: { backgroundColor: 'red', color: 'white' },
                                    className: 'custom-class-2'
                                }
                            ]}
                            autoClose='true'
                        >
                            <TeamButton key={team.id} {...team} chooseTeam={this.goToTeamStats} deleteTeam={this.props.deleteUserTeam} isMobile={isMobile} />
                        </Swipeout>
                    )
                }
                return (
                    <TeamButton key={team.id} {...team} openModal={this.openModal} chooseTeam={this.goToTeamStats} isMobile={isMobile} deleteTeam={this.handleDeleteTeam} />
                );
            });

            return (
                <ul>
                    <div className="team-list-container">
                        {homepageTeamList}
                        <DeleteModal isModalOpen={isModalOpen} closeModal={this.closeModal} deleteTeam={this.handleDeleteTeam} teamName={deleteTeamName}/>
                    </div>
                </ul>
            );
        }
        return <EmptyHomepage goToBrowse={this.goToBrowse} />
    }
}

function mapStateToProps(state){
    return{
        userTeams: state.userTeams.userTeams
    }
}

export default connect(mapStateToProps, {
    getUserTeams, deleteUserTeam
})(UserTeamList);