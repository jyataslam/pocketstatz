import React, { Component } from 'react';

class DropDown extends Component {

    render() {
        const { checkUserLoggedIn, selectedTeams } = this.props;
        const margin = {"marginTop": "15px"};

        if (selectedTeams.length !== 0){
            return (
                <button onClick={() => {checkUserLoggedIn()}} style={margin} className="btn btn-small green accent-4 col s12 pulse">Go To My Teams</button>
            )
        } else {
            return (
                <button onClick={() => {checkUserLoggedIn()}} style={margin} className="btn btn-small red lighten-3 accent-4 offset-s1 col s10">Select Your Teams</button>
            )
        }
    }
}

export default DropDown;