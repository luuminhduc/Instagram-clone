import React from "react";
import { NavLink } from "react-router-dom";
import { firestore } from "../../firebase/config";
import firebase from "firebase";
import { useSelector } from "react-redux";

const SuggestionItem = ({ item }) => {
  const { userName, email, avatar, followingList, followerList, id } = item;
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const handleFollow = () => {
    firestore
      .collection("users")
      .doc(id)
      .update({
        followerList: firebase.firestore.FieldValue.arrayUnion(auth.uid),
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(auth.uid)
          .update({
            followingList: firebase.firestore.FieldValue.arrayUnion(id),
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const followBtn = () => {
    return followerList?.includes(auth.uid) ? (
      <button onClick={handleUnfollow} className="text-blue-600 font-bold">
        Unfollow
      </button>
    ) : (
      <button onClick={handleFollow} className="text-blue-600 font-bold">
        {followingList?.includes(auth.uid) ? "Follow back" : "Follow"}
      </button>
    );
  };

  const handleUnfollow = () => {
    firestore
      .collection("users")
      .doc(id)
      .update({
        followerList: firebase.firestore.FieldValue.arrayRemove(auth.uid),
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(auth.uid)
          .update({
            followingList: firebase.firestore.FieldValue.arrayRemove(id),
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex mb-4 w-full flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center">
        <span className="mr-1">
          {avatar ? (
            <img src={avatar} className="h-6 w-6 rounded-full" alt="avatar" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </span>
        <NavLink
          to={`/user/${id}`}
          className="cursor-pointer hover:bg-gray-200 rounded p-0.5"
        >
          {userName ? userName : email}
        </NavLink>
      </div>
      {id !== auth.uid && followBtn()}
    </div>
  );
};

export default SuggestionItem;
