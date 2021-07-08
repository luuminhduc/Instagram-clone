import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountList } from "../../redux/action/userAction/actions";
import SuggestionItem from "../SuggestionItem";

const AccountModal = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { accountState, userList } = userReducer;

  const dispatch = useDispatch();

  const [list, setList] = useState();

  useEffect(() => {
    if (accountState && accountState?.accountList?.length > 0) {
      const currentList = accountState.accountList;
      const newList = currentList.map((item) =>
        userList.find((el) => el.id === item.id)
      );
      setList(newList);
    }
  }, [userList, accountState]);

  return accountState && accountState.title ? (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen flex px-3 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded w-full lg:max-w-md md:max-w-lg">
        <div className="flex mb-5 p-3 flex-row border-b border-gray-200 border-solid justify-between items-center">
          <div></div>
          <h2 className="text-xl font-bold">{accountState.title}</h2>
          <svg
            onClick={() => dispatch(setAccountList({}))}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="p-3 max-h-56 overflow-y-scroll">
          {list?.map((item, idx) => (
            <SuggestionItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AccountModal;
