import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    username: "",
    error: false,
    errorMsg: ""
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SIGN_IN_USER:
            return{...state, ...action.response};
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_ERROR:
            return{...DEFAULT_STATE, error: true };
        case types.SIGN_OUT_USER:
            return {...DEFAULT_STATE};
        case types.CLEAR_ERRORS:
            return {...state, error: false, errorMsg: ""}
        default:
            return state;
    }
};

    