import { showModal } from '../modalAction/actions';
import * as actions from './actionTypes';

export const fetchComments = () => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('comments').orderBy("time","desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(),id:doc.id}));
        dispatch({
            type: actions.FETCH_COMMENTS,
            payload: docs,
        })
    })
}

export const addComment = (comment, setText) => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('comments').add(comment).then(() => {
        setText('');
        dispatch(resetReplyId())
    })
    .catch(err => {
        dispatch(showModal({text:err.message}));
    })
}

export const resetReplyId = () => {
    return {
        type: actions.RESET_REPLYID
    }
}

export const getReplyId = (id) => {
    return{
        type: actions.GET_REPLYID,
        payload:id
    }
}