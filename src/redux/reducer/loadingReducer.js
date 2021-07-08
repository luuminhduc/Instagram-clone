import * as actions from '../action/loadingAction/actionTypes';

const initialState = {
    loading: false,
}

export default function loadingReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.SHOW_LOADING: case actions.HIDE_LOADING: return {...state,loading: payload};
        default: return state;
    }
}