import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SuggestionItem from "../../components/SuggestionItem";

const Suggestion = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    setSuggestionList(userList.filter((el) => el.id !== auth.uid));
  }, [userList, auth.uid]);

  return (
    <div className="w-full lg:max-w-lg  md:max-w-xl mx-auto">
      <h3 className="text-xl mb-5">Suggestion</h3>
      <div className="w-full bg-white border border-solid border-gray-200 p-4">
        {suggestionList.length > 0 &&
          suggestionList.map((item, idx) => (
            <SuggestionItem key={idx} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Suggestion;
