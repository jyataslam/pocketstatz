import React, { Component } from 'react';
import SignUpForm from './sign_up_form';
import { clearErrors, signUp, signIn } from "../../../actions";
import { connect } from "react-redux";

class SignUp extends Component {
    handleSignUp = values => {
        if (this.props.signUp(values)) {
            this.props.signIn(values);
        };
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const { error } = this.props;
        return (
            <div className="signup-container">
                <div className="container">
                    <div className="signup-logo-container">
                        <img className="signup-logo col s12 m8 offset-m2" src="/dist/assets/images/logos/pocketstatzlogo.png" alt="LOGO" />
                    </div>
                    <p className="center signup-text">Create Your Account</p>
                    <SignUpForm signUp={this.handleSignUp} />
                    <p className="center error-text">{(error) ? "Username is taken" : ""}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.user.error
    }
}

export default connect(mapStateToProps, {
    signUp,
    signIn,
    clearErrors
})(SignUp);
