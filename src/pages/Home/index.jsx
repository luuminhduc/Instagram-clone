import React from "react";
import { useSelector } from "react-redux";
import PostList from "../../components/PostList";
import SuggestionItem from "../../components/SuggestionItem";
import { NavLink } from "react-router-dom";

const Home = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const renderSuggestionList = () => {
    const suggestionList =
      userList.length > 0
        ? userList.filter((el) => el.id !== auth.uid).slice(0, 5)
        : [];
    return (
      <div className="text-xs">
        {suggestionList?.map((item, idx) => (
          <SuggestionItem item={item} key={idx} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="lg:grid gap-10 grid-cols-7">
        <div className="col-span-5">
          <PostList />
        </div>
        <div className="lg:block hidden">
          <div className="fixed top-36 xl:right-56 lg:right-12 w-56">
            <div className="flex flex-row justify-between items-center mb-5">
              <span className="text-gray-500 text-sm">Suggestion</span>
              <NavLink
                to="/suggestion"
                className="text-black text-sm font-bold"
              >
                View all
              </NavLink>
            </div>
            {renderSuggestionList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
