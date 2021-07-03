import * as actions from './actionTypes';

export const addPost = (post,history) => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    console.log(post);
    firestore.collection('posts').add(post)
    .then(() => {
        history.push('/');
    })
    .catch(err => {
        console.log(err);
    })
}

export const fetchPostList = () => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('posts').orderBy("time","desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(),id:doc.id}));
        dispatch({
            type: actions.FETCH_POST_LIST,
            payload: docs,
        })
    })
}

export const selectPost = (post) => {
    return{
        type: actions.SELECT_POST,
        payload:post,
    }
}