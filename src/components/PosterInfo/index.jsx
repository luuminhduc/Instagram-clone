import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectPost } from "../../redux/action/postAction/actions";

const PosterInfo = ({ uid, id }) => {
  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;
  const poster = userList.find((el) => el.id === uid);
  const { avatar, userName, email } = poster;

  const dispatch = useDispatch();

  return (
    <div className="flex flex-row justify-between items-center p-3">
      <div className="flex flex-row justify-start items-center">
        {avatar ? (
          <img src={avatar} className="rounded-full mr-3 w-14 h-14" alt="" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 bg-gray-300 mr-3 rounded-full p-2 text-white w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
        <NavLink
          onClick={() => selectPost(null)}
          to={`/user/${uid}`}
          className="font-semibold border-b hover:border-solid hover:border-black border-white"
        >
          {userName ? userName : email}
        </NavLink>
      </div>
      <NavLink to={`/post/${id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </NavLink>
    </div>
  );
};

export default PosterInfo;
