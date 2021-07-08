import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { firestore } from "../../firebase/config";
import firebase from "firebase";
import { showModal } from "../../redux/action/modalAction/actions";
import { setAccountList } from "../../redux/action/userAction/actions";

const UserInfo = ({ user }) => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { email, userName, about, avatar, id, followerList, followingList } =
    user;

  const postReducer = useSelector((state) => state.postReducer);
  const { postList } = postReducer;

  const userReducer = useSelector((state) => state.userReducer);
  const { currentUser, userList } = userReducer;

  const dispatch = useDispatch();

  const showFollowers = () => {
    const list = followerList.map((followerId) =>
      userList.find((el) => el.id === followerId)
    );
    dispatch(setAccountList({ accountList: list, title: "Followers" }));
  };

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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return currentUser ? (
    <div className="border-b border-solid border-gray-200 pb-5 mb-5">
      <div className="w-full flex flex-row justify-evenly items-start">
        {avatar ? (
          <img
            className="h-36 w-36 rounded-full"
            alt="Something"
            src={avatar}
          />
        ) : (
          <div className="flex justify-end items-end bg-gray-300 cursor-pointer rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-36 w-36 text-white"
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
          </div>
        )}
        <div>
          {/*  */}
          <div className="flex md:ml-0 ml-5 md:flex-row flex-col justify-start md:items-center items-start mb-5">
            <h3 className="text-3xl md:mb-0 mb-5 font-light mr-8">
              {userName ? userName : email}
            </h3>
            {auth.uid !== id && (
              <div>
                {!followerList?.includes(auth.uid) ? (
                  <button
                    onClick={handleFollow}
                    className="px-8 py-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-500 rounded focus:outline-none"
                  >
                    {currentUser.followerList?.includes(id)
                      ? "Follow back"
                      : "Follow"}
                  </button>
                ) : (
                  <div
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: `Unfollow ${userName}`,
                          callback: handleUnfollow,
                        })
                      )
                    }
                    className="px-3 flex flex-row justify-center items-center py-1 border border-solid border-gray-200 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
            {auth.uid === id && (
              <NavLink
                to="/account/edit"
                className="py-2 px-4 cursor-pointer border border-solid border-trueGray-300"
              >
                Edit your page
              </NavLink>
            )}
          </div>
          <div className="md:flex hidden flex-row justify-start items-center">
            <p className="mr-8">
              <span className="font-bold">
                {postList.filter((el) => el.uid === id)?.length}
              </span>{" "}
              posts
            </p>
            <p onClick={showFollowers} className="mr-8 cursor-pointer">
              <span className="font-bold">{followerList?.length}</span>{" "}
              Followers
            </p>
            <p className="mr-8">
              <span className="font-bold">{followingList?.length}</span>{" "}
              Followings
            </p>
          </div>

          {/* ABOUT */}
          <p className="mt-5">{about}</p>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex border-t border-solid border-gray-200 pt-5 mt-5 md:hidden flex-row justify-between items-center">
        <p className="mr-8">
          <span className="font-bold">
            {postList.filter((el) => el.uid === id)?.length}
          </span>{" "}
          posts
        </p>
        <p className="mr-8">
          <span className="font-bold">{followerList?.length}</span> Followers
        </p>
        <p className="mr-8">
          <span className="font-bold">{followingList?.length}</span> Followings
        </p>
      </div>
    </div>
  ) : (
    ""
  );
};

export default UserInfo;
