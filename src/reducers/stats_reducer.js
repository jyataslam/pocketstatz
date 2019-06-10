import types from '../actions/types';

const DEFAULT_STATE = {
    team1: null,
    team2: null,
    gameDetails: null,
    isLoaded: false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type)
    {
        case types.RETRIEVE_STATS:
            return { ...state, ...action.response };
        default:
            return state;
    }
}
