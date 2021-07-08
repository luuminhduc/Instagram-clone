import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Date from "../Date";
import { firestore } from "../../firebase/config";
import firebase from "firebase";
import { setAccountList } from "../../redux/action/userAction/actions";
import { useState } from "react";
import { useEffect } from "react";

const PostInfo = ({ post }) => {
  const { id } = post;

  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const postReducer = useSelector((state) => state.postReducer);
  const { postList } = postReducer;

  const [renderedPost, setRenderedPost] = useState(null);

  useEffect(() => {
    setRenderedPost(postList.find((el) => el.id === id));
  }, [id, postList]);

  const renderPostInfo = () => {
    const { text, likes, time } = renderedPost;

    const hasAlreadyLiked = () => {
      return likes.includes(auth.uid);
    };

    const handleLike = () => {
      if (hasAlreadyLiked()) {
        firestore
          .collection("posts")
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.uid),
          });
      } else {
        firestore
          .collection("posts")
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.uid),
          });
      }
    };

    const handleShowLikes = () => {
      const list = likes.map((likeId) =>
        userList.find((el) => el.id === likeId)
      );
      dispatch(
        setAccountList({
          accountList: list,
          title: "Likes",
        })
      );
    };

    return (
      <div className="">
        <div className="flex flex-row justify-start font-light items-center">
          <span onClick={handleLike} className="mr-3 cursor-pointer">
            {likes.includes(auth.uid) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-rose-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </span>

          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </span>
        </div>
        <span
          onClick={handleShowLikes}
          className="font-bold border-b border-white border-solid hover:border-black cursor-pointer"
        >
          {likes.length} likes
        </span>
        <p className="mt-3">{text}</p>
        {time && <Date time={time} />}
      </div>
    );
  };

  return renderedPost ? renderPostInfo() : "";
};

export default PostInfo;
