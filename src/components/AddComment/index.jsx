import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { timeStamp } from "../../firebase/config";
import {
  addComment,
  resetReplyId,
} from "../../redux/action/commentAction/actions";
import { getUser } from "../../utilities/getUser";

const AddComment = ({ postId }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const commentReducer = useSelector((state) => state.commentReducer);
  const { replyId } = commentReducer;

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const onSubmit = () => {
    if (text) {
      const comment = {
        text,
        postId,
        uid: auth.uid,
        replyId,
        time: timeStamp(),
        likes: [],
      };
      dispatch(addComment(comment, setText));
    }
  };

  return (
    <div className="border-t p-4">
      {replyId && (
        <p className="text-xs  mb-2 text-blue-500">
          @
          {getUser(userList, replyId.uid)?.userName
            ? getUser(userList, replyId.uid)?.userName
            : getUser(userList, replyId.uid)?.email}
          <svg
            onClick={() => dispatch(resetReplyId())}
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 ml-1 cursor-pointer w-3 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      )}
      <div className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Add comment"
          className="bg-transparent text-sm flex-grow focus:outline-none"
        />
        <button
          onClick={onSubmit}
          className={`${
            text
              ? "text-blue-600 font-bold"
              : "text-blue-300 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddComment;
