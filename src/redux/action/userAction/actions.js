import * as actions from './actionTypes';

export const getCurrentUser = (uid) => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    if(uid) {
        firestore.collection('users').doc(uid).get()
        .then((res) => {
            dispatch({
                type: actions.GET_CURRENT_USER,
                payload: {...res.data(),id:res.id}
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const fetchAllUsers = () => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('users').onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => {
            docs.push({...doc.data(), id:doc.id})
        });
        dispatch({
            type: actions.FETCH_ALL_USERS,
            payload: docs,
        })
    })
}

export const updateUserInfo = (user,id) => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('users').doc(id).set({
        ...user
    })
    .catch(err => {
        console.log(err);
    })
}