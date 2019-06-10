import React, {Component} from 'react';
import SignInForm from './sign_in_form';
import { clearErrors, signIn} from "../../../actions";
import {connect} from "react-redux";

class SignIn extends Component {
    handleSignIn = (values) => {
        this.props.signIn(values);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }
    
    render() {
        const { error } = this.props;
        return (
            <div className="signin-container">
                <div className="container">
                    <div className="signin-logo-container">
                        <img className="signin-logo col s12 m8 offset-m2" src="/dist/assets/images/logos/pocketstatzlogo.png" alt="LOGO"/>
                        <p className="center signin-text">Sign In To Your Account</p>
                    </div>
                    
                    <SignInForm auth={this.props.auth} signIn={this.handleSignIn}/>
                    <p className="center error-text">{(error) ? "Invalid Username or Password" : ""}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        error: state.user.error
    }
}

export default connect(mapStateToProps, {
    clearErrors, signIn
})(SignIn);
