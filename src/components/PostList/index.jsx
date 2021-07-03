import React from "react";
import { useSelector } from "react-redux";
import PostItem from "../PostItem";

const PostList = () => {
  const postReducer = useSelector((state) => state.postReducer);
  const { postList } = postReducer;
  return postList.length > 0 ? (
    <div>
      {postList.map((item, idx) => (
        <PostItem key={idx} post={item} />
      ))}
    </div>
  ) : (
    ""
  );
};

export default PostList;
