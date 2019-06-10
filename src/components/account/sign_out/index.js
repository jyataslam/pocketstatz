import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../actions';
import {isLoaded} from '../../../actions';

class SignOut extends Component {

    componentDidMount(){
        this.props.signOut();
        this.props.history.push("/");
    }

    render(){
        return(
            <div className="sign-out">
                <div className="sign-out-header center">
                    <h1 className="center">Thank you for visiting our site</h1>
                    <h2 className="center">You have been signed out</h2>
                </div>
            </div>
        );
    }
}

export default connect(null, {
    signOut: signOut,
    // isLoaded: state.loading.isLoaded,
})(SignOut);