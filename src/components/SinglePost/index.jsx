import React from "react";
import PosterInfo from "../PosterInfo";
import PostImageList from "../postImageList";
import PostInfo from "../postInfo";
import AddComment from "../AddComment";
import PostCommentList from "../PostCommentList";
import "./index.css";

const SinglePost = ({ post, modal, currentPostIndex }) => {
  const renderBlock = () => {
    const { uid, imageList, id } = post;
    return (
      <div className="md:flex w-full md:flex-row md:h-580 bg-white border border-solid border-gray-200 justify-center items-start">
        <div className="border-b block md:hidden border-solid w-full border-gray-200">
          <PosterInfo uid={uid} id={id} />
        </div>
        <div className="md:w-2/3 h-full">
          <PostImageList
            currentPostIndex={currentPostIndex}
            isFull={true}
            modal={true}
            imageList={imageList}
          />
        </div>
        <div className="md:w-1/3 flex flex-col h-full border-l border-solid border-gray-200 justify-start items-start">
          <div className="border-b hidden md:block border-solid w-full border-gray-200">
            <PosterInfo uid={uid} id={id} />
          </div>
          <div className="flex-grow div overflow-y-scroll w-full">
            <PostCommentList postId={id} />
          </div>
          <div className="p-3">
            <PostInfo post={post} />
          </div>
          <div className={`w-full md:block ${modal && "hidden"}`}>
            <AddComment postId={id} />
          </div>
        </div>
      </div>
    );
  };

  return post ? <div>{renderBlock()}</div> : "";
};

export default SinglePost;
