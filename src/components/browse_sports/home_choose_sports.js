import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './browse_sports.scss';


class BrowseSports extends Component {

    render() {
        const collectionStyle = { 'padding': '0', 'border': 'none' };

        return (
            <Fragment>
                <div className="choose-container">
                    <h4 className="center header-text">CHOOSE A SPORT</h4>
                    <div className="container">
                        <div className="row">
                            <div style={collectionStyle} className=" col s12 m8 offset-m2">
                                <Link href="#" to="/browse/nba" id="orange-btn" className="btn btn-large col s12 sport-name">NBA</Link>
                                <Link href="#" to="/browse/nhl" id="orange-btn" className="btn btn-large col s12 sport-name">NHL</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(BrowseSports);
