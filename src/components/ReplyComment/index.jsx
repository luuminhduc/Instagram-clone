import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PostCommentItem from "../PostCommentItem";

const ReplyComment = ({ uid, commentId }) => {
  const commentReducer = useSelector((state) => state.commentReducer);

  const { commentList } = commentReducer;

  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    setReplyList(
      commentList.filter(
        (el) => el.replyId?.uid === uid && el.replyId?.commentId === commentId
      )
    );
  }, [uid, commentId, commentList]);

  return (
    <div>
      {replyList.length > 0 &&
        replyList.map((item, idx) => <PostCommentItem key={idx} item={item} />)}
    </div>
  );
};

export default ReplyComment;
