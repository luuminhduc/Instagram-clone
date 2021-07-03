import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBwMLxJ80Iv8-g4t0_MZOWq_F9snm-eIyo",
    authDomain: "instagram-clone-8f1f5.firebaseapp.com",
    projectId: "instagram-clone-8f1f5",
    storageBucket: "instagram-clone-8f1f5.appspot.com",
    messagingSenderId: "427780490432",
    appId: "1:427780490432:web:e99245b7fead80f1ffd925"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();

  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

  export const storage = firebase.storage()

  export default firebase;
