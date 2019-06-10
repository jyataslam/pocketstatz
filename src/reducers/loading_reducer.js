import types from '../actions/types';

const DEFAULT_STATE = {
    loading: false
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOAD_START:
            return { ...state, loading: true }
        case types.LOAD_END:
            return { ...state, loading: false }
        default:
            return state;
        
    }
}