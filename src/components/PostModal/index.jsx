import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPost } from "../../redux/action/postAction/actions";
import SinglePost from "../SinglePost";

const PostModal = () => {
  const postReducer = useSelector((state) => state.postReducer);
  const { postList, selectedPost } = postReducer;

  const dispatch = useDispatch();

  const [userPostList, setUserPostList] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);

  const params = useParams();

  const { userId } = params;

  useEffect(() => {
    setUserPostList(postList.filter((el) => el.uid === userId));
  }, [userId]);

  useEffect(() => {
    if (selectedPost) {
      const index = userPostList.findIndex((el) => el.id === selectedPost.id);
      setCurrentPostIndex(index);
    }
  }, [selectedPost, userPostList]);

  const handleNextPost = () => {
    dispatch(selectPost(userPostList[currentPostIndex + 1]));
  };
  const handlePrevPost = () => {
    dispatch(selectPost(userPostList[currentPostIndex - 1]));
  };

  return selectedPost ? (
    <div className="fixed z-40 top-0 left-0 w-screen min-h-screen flex flex-row justify-center items-center bg-black bg-opacity-40">
      <svg
        onClick={() => dispatch(selectPost(null))}
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white absolute top-5 right-10 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      {selectedPost && currentPostIndex > 0 && (
        <svg
          onClick={handlePrevPost}
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 cursor-pointer text-gray-300 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}

      <div className="md:w-4/6 w-3/4 mx-3 md:h-auto h-96">
        <SinglePost
          currentPostIndex={currentPostIndex}
          post={selectedPost}
          modal={true}
        />
      </div>
      {selectedPost && currentPostIndex < userPostList.length - 1 && (
        <svg
          onClick={handleNextPost}
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 cursor-pointer text-gray-300 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </div>
  ) : (
    ""
  );
};

export default PostModal;
