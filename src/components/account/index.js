import React from "react";
import {Route, Switch} from "react-router-dom";
import auth from '../../hoc/auth';
import SignIn from "./sign_in";
import SignUp from "./sign_up";
import SignOut from "./sign_out";

export default props => {
    const {match} = props;

    return(
        <Switch>
            <Route path={`${match.path}/sign-in`} component={auth(SignIn, '/user-teams', false)}/>
            <Route path={`${match.path}/sign-out`} component={SignOut}/>
            <Route path={`${match.path}/sign-up`} component={auth(SignUp, '/browse', false)}/>
        </Switch>
    );
}