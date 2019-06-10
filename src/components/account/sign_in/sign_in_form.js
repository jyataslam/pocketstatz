import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import Input from "../../general/input";
import { ToastContainer, toast } from 'react-toastify';
import "./sign_in_form.scss";

const SignInForm = props => {
    const { handleSubmit, signIn } = props;
    return (
        <form className="signin-form" onSubmit={handleSubmit(signIn)}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <Field id="username" name="username" label="Username" component={Input} />
                </div>

                <div className="col s12 m6 offset-m3">
                    <Field id="password" name="password" type="password" label="Password" component={Input} />
                </div>

            </div>
            <div className="row center">
                <Link to="/account/sign-up">No account? Create one here!</Link>
                <div>
                    <ToastContainer/>
                </div>
            </div>
            <div className="row">
                <button type="submit" className="login-button btn col s12 m6 offset-m3">Log In</button>
            </div>
        </form>
    );
}

function validate({ username, password }) {
    const errors = {};

    if (!username) {
        errors.username = 'Please enter your email';
    }

    if (!password) {
        errors.password = 'Please enter your password';
    }

    return errors;
}

export default reduxForm({
    form: "sign-in-form",
    touchOnBlur: false,
    validate,
    shouldValidate: params => {
        if (!params.props.submitting) {
            return false;
        }
        return true;
    }
})(SignInForm);


