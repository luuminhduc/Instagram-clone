import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserInfo";
import UserPagePostList from "../../components/UserPagePostList";

const UserPage = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const params = useParams();
  const { userId } = params;

  const postReducer = useSelector((state) => state.postReducer);
  const { postList } = postReducer;

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userList.find((el) => el.id === userId));
  }, [userId, userList]);

  return user ? (
    <div>
      <UserInfo user={user} />
      <UserPagePostList list={postList.filter((el) => el.uid === userId)} />
    </div>
  ) : (
    ""
  );
};

export default UserPage;
