import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectPost } from "../../redux/action/postAction/actions";

const UserPagePostItem = ({ item }) => {
  const [showBlock, setShowBlock] = useState(false);
  const { likes } = item;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectPost(item));
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onMouseLeave={() => setShowBlock(false)}
        onMouseEnter={() => setShowBlock(true)}
        className="relative cursor-pointer"
      >
        <img src={item.imageList[0]} className="" alt="" />
        <div
          className={`absolute top-0 text-white left-0 w-full h-full bg-black bg-opacity-40 ${
            showBlock ? "flex" : "hidden"
          } flex-row justify-evenly font-bold text-lg items-center`}
        >
          <div className="flex flex-row justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>{likes.length}</span>
          </div>
          <div className="flex flex-row justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPagePostItem;
