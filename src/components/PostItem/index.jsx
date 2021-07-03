import React from "react";
import { NavLink } from "react-router-dom";
import PosterInfo from "../PosterInfo";
import PostImageList from "../postImageList";
import AddComment from "../AddComment";
import PostInfo from "../postInfo";

const PostItem = ({ post }) => {
  const { uid, imageList, id } = post;

  return (
    <div className="border border-solid border-gray-200 mb-5 bg-white">
      <PosterInfo uid={uid} id={id} />
      <PostImageList imageList={imageList} />

      <div className="p-3">
        <PostInfo post={post} />

        <NavLink className="text-sm text-gray-500" to={`/post/${id}`}>
          View comments
        </NavLink>
      </div>

      <AddComment postId={id} />
    </div>
  );
};

export default PostItem;
