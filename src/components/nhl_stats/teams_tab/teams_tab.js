import React, {Component} from 'react';


class TeamsTab extends Component {
    render(){
        return(
            <div id="buttons-container" className="container">
                <div className="row" id="row">
                        <button className="btn col s6"  onClick={this.props.showLeft}>{this.props.team1.teamName}</button>
                        <button className="btn col s6"  onClick={this.props.showRight}>{this.props.team2.teamName}</button>
                </div>
            </div>
        );
    }
}

export default TeamsTab;