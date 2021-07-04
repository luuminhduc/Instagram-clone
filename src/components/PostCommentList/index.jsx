import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PostCommentItem from "../PostCommentItem";

const PostCommentList = ({ postId }) => {
  const commentReducer = useSelector((state) => state.commentReducer);
  const { commentList } = commentReducer;

  const [postCommentList, setPostCommentList] = useState([]);

  useEffect(() => {
    setPostCommentList(
      commentList.filter((el) => el.postId === postId && !el.replyId)
    );
  }, [postId, commentList]);

  return (
    <div>
      {postCommentList.length > 0 &&
        postCommentList.map((item, idx) => (
          <PostCommentItem key={idx} item={item} />
        ))}
    </div>
  );
};

export default PostCommentList;
