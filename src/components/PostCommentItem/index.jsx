import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getReplyId } from "../../redux/action/commentAction/actions";
import Date from "../Date";
import ReplyComment from "../ReplyComment";

const PostCommentItem = ({ item }) => {
  const { uid, text, likes, time, id } = item;

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const [commenter, setCommenter] = useState(null);

  useEffect(() => {
    setCommenter(userList.find((el) => el.id === uid));
  }, [uid, userList]);

  const dispatch = useDispatch();

  const getCommenterAvatar = () => {
    const { avatar } = commenter;
    return avatar ? (
      <img src={avatar} alt="Avatar" className="rounded-full mr-3 w-7 h-7" />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 bg-gray-300 mr-2 rounded-full p-1 text-white w-6"
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
    );
  };

  const getComment = () => {
    const { userName, email } = commenter;
    return (
      <div className="w-10/12">
        <div>
          <p className="font-bold inline-block mr-1">
            {userName ? userName : email}
          </p>
          <span>{text}</span>
        </div>
        <div className="w-full flex mt-3 text-gray-400 flex-row justify-between items-center">
          {time && <Date time={time} />}
          <span>{likes.length} likes</span>
          {!item.replyId && (
            <span
              onClick={() =>
                dispatch(
                  getReplyId({
                    uid,
                    commentId: id,
                  })
                )
              }
              className="text-gray-500 cursor-pointer"
            >
              Reply
            </span>
          )}
        </div>
        {/* COMMENTS */}
        {!item.replyId && (
          <div>
            <ReplyComment uid={uid} commentId={id} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full p-3 text-xs">
      <div className="flex flex-row justify-between items-start">
        {commenter && getCommenterAvatar()}
        {commenter && getComment()}
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PostCommentItem;
