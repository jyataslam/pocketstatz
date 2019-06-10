import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavFooter extends Component {

    render() {
       const margin = {"marginBottom":"0px"};
       const padding = {"paddingLeft": "0px", "paddingRight": "0px"};
        return (
            <footer className="page-footer " id="foot">
                <div className="row" id="frow" style={margin}>
                    <div className="col s12" style={padding}>
                        <ul className="tabs tabs-fixed-width transparent white-text">
                            <li className="tab col s4 white-text"><Link to="/user-teams" className="white-text"><i className="material-icons">home</i></Link></li>
                            <li className="tab col s4"><Link to="/browse" className="white-text"><i className="material-icons">add_circle</i></Link></li>
                            <li className="tab col s4"><Link to="/account/sign-in" className="white-text"><i className="material-icons">account_circle</i></Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

export default NavFooter;