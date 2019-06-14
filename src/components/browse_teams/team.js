import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { teamList } from "../../actions";

class Team extends Component {

    render() {
        const { image_url, chooseTeam, id, selected, have3Teams } = this.props;
        let isClicked = selected ? "team-item-clicked" : "team-item";

        if(have3Teams){
            return (
                <Fragment>
                    <div className="team-container col s6 m3" >
                        <a className="team-item-clicked default-cursor z-depth-3">
                            <img className="team-image" src={`/dist/assets/${image_url}`} />
                        </a>
                    </div>
                </Fragment>
            );
        }
        else{
            return (
                <Fragment>
                    <div className="team-container col s6 m3" >
                        <a className={`${isClicked} z-depth-3`} onClick={() => { chooseTeam(id) }}>
                            <img className="team-image" src={`/dist/assets/${image_url}`} />
                        </a>
                    </div>
                </Fragment>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        clicked: state.listOfTeams.clicked
    }
}

export default connect(mapStateToProps, {
    teamList
})(Team);
