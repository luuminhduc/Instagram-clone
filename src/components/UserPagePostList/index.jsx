import React from "react";
import UserPagePostItem from "../UserPagePostItem";

const UserPagePostList = ({ list }) => {
  return (
    <div className="grid grid-cols-3 lg:gap-5 gap-2">
      {list?.map((item, idx) => (
        <UserPagePostItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default UserPagePostList;
