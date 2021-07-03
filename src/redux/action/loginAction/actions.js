import * as actions from './actionTypes';

export const loginRequest = (user,history) => async (dispatch,getState,{getFirebase})  => {
    const firebase = getFirebase();
    const {email,password} = user;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => dispatch(loginSuccess(history)))
    .catch(err => dispatch(loginFailure(err)))
}

const loginFailure = (err) => {
    return {
        type: actions.LOGIN_FAILURE,
        payload: err.message
    }
}

const loginSuccess = (history) => {
    history.goBack();
    return{
        type: actions.LOGIN_SUCCESS
    }
}

export const hideLoginError = () => {
    return {
        type: actions.HIDE_LOGIN_ERROR,
    }
}

export const logout =  () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .catch(err => {
        console.log(err);
    })
}