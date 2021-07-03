import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SinglePost from "../../components/SinglePost";

const SinglePostPage = () => {
  const params = useParams();
  const { postId } = params;

  const [post, setPost] = useState(null);

  const postReducer = useSelector((state) => state.postReducer);

  const { postList } = postReducer;

  useEffect(() => {
    setPost(postList.find((el) => el.id === postId));
  }, [postId, postList]);

  return (
    <div>
      <SinglePost post={post} />
    </div>
  );
};

export default SinglePostPage;
