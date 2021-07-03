import * as actions from '../action/userAction/actionTypes';

const initialState = {
    currentUser:'',
    userList:[],
}

export default function userReducer(state=initialState, action) {
    const {type,payload} = action;
    switch(type){
        case actions.GET_CURRENT_USER: return{...state, currentUser:payload};
        case actions.FETCH_ALL_USERS: return{...state,userList:payload};
        default: return state;
    }
}