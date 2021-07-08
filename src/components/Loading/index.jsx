import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const Loading = () => {
  const loadingReducer = useSelector((state) => state.loadingReducer);
  const { loading } = loadingReducer;

  return loading ? (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-20 z-50 flex justify-center items-center">
      <div class="loader-container">
        <div class="loader load-1"></div>
        <div class="loader load-2"></div>
        <div class="loader load-3"></div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
