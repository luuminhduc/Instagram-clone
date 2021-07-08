import * as actions from './actionTypes';

export const showLoading = () => {
    return{
        payload: true,
        type: actions.SHOW_LOADING
    }
}

export const hideLoading = () => {
    return{
        payload:false,
        type: actions.HIDE_LOADING
    }
}