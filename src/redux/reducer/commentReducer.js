import * as actions from '../action/commentAction/actionTypes';

const initialState = {
    commentList: [],
    replyId:null,
}

export default function commentReducer(state=initialState, action ){
    const {type, payload} = action;
    switch(type){
        case actions.FETCH_COMMENTS: return {...state, commentList:payload};
        case actions.RESET_REPLYID: return {...state,replyId:''};
        case actions.GET_REPLYID: return{
            ...state,
            replyId:payload
        }
        default: return state;
    }
}