import * as actions from '../action/postAction/actionTypes';

const initialState = {
    postList:[],
    selectedPost:null,
}

export default function postReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_POST_LIST:return {...state,postList:payload};
        case actions.SELECT_POST: return{...state, selectedPost:payload};
        default: return state;
    }
}