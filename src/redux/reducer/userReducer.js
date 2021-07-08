import * as actions from '../action/userAction/actionTypes';

const initialState = {
    currentUser:'',
    userList:[],
    accountState:{
    accountList:[],
    title:'',
    },
}

export default function userReducer(state=initialState, action) {
    const {type,payload} = action;
    switch(type){
        case actions.GET_CURRENT_USER: return{...state, currentUser:payload};
        case actions.FETCH_ALL_USERS: return{...state,userList:payload};
        case actions.SET_ACCOUNT_LIST: return {...state,accountState:payload}
        default: return state;
    }
}