import types from '../actions/types';

const DEFAULT_STATE = {
    userTeams: null

};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type)
    {
        case types.RETRIEVE_USER_TEAMS:
            return { ...state, ...action.response };
        case types.DELETE_USER_TEAM:
            return {...state, ...action.response};
        default:
            return state;
    }
}
