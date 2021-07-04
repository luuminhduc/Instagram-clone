import React from "react";
import PosterInfo from "../PosterInfo";
import PostImageList from "../postImageList";
import AddComment from "../AddComment";
import PostInfo from "../postInfo";
import { useDispatch } from "react-redux";
import { selectPost } from "../../redux/action/postAction/actions";

const PostItem = ({ post }) => {
  const { uid, imageList, id } = post;

  const dispatch = useDispatch();

  return (
    <div className="border border-solid border-gray-200 mb-5 bg-white">
      <PosterInfo uid={uid} id={id} />
      <PostImageList imageList={imageList} />

      <div className="p-3">
        <PostInfo post={post} />

        <span
          onClick={() => dispatch(selectPost(post))}
          className="text-sm cursor-pointer text-gray-500"
        >
          View comments
        </span>
      </div>

      <AddComment postId={id} />
    </div>
  );
};

export default PostItem;
