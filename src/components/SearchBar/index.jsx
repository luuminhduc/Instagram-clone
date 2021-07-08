import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  const [text, setText] = useState("");

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const [showResult, setShowResult] = useState(false);

  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    if (text) {
      setResultList(
        userList?.filter(
          (el) => el.userName.toUpperCase().indexOf(text.toUpperCase()) > -1
        )
      );
    } else {
      setResultList([]);
    }
  }, [text, userList]);

  return (
    <div className="md:w-64 w-40 relative">
      <input
        onClick={() => setShowResult(true)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="border border-solid focus:outline-none focus:border-blue-500 border-gray-200 py-1 px-3 w-full"
        placeholder="Search..."
      />
      {showResult && (
        <div className="absolute bg-white border overflow-y-scroll border-solid border-gray-200 shadow p-4 pt-10 w-96 h-96 top-10 -left-10 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowResult(false)}
            className="h-5 w-5 absolute right-3 top-3 text-gray-600 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {resultList.length > 0 ? (
            resultList.map((item, idx) => (
              <NavLink
                onClick={() => {
                  setShowResult(false);
                }}
                to={`/user/${item.id}`}
                className="mb-1 hover:bg-gray-100 p-3 flex flex-row justify-start items-center"
                key={idx}
              >
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    className="h-6 w-6 mr-2 rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 mr-2 w-6 cursor-pointer"
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
                <p>{item.userName}</p>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-600">No results</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
