import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const PostImageList = ({ imageList, isFull, modal, currentPostIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex);

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentPostIndex]);

  return (
    <div className="h-full w-full relative bg-center bg-cover">
      {imageList.length > 0 && (
        <img
          alt={`Something`}
          className={`${isFull && "h-full"} ${
            modal && "w-44 md:w-auto"
          } mx-auto`}
          src={imageList[currentIndex]}
        />
      )}

      {imageList.length > 0 && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-center">
          <div></div>
          <div className="flex flex-row justify-between w-full items-center px-3">
            {currentIndex > 0 ? (
              <svg
                onClick={() => setCurrentIndex(currentIndex - 1)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer bg-gray-200 rounded-full text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span></span>
            )}
            {currentIndex < imageList.length - 1 ? (
              <svg
                onClick={() => setCurrentIndex(currentIndex + 1)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer bg-gray-200 rounded-full text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span></span>
            )}
          </div>
          {/* CIRCLES */}
          {imageList.length > 1 && (
            <div
              className={`flex flex-row transform justify-center items-center ${
                isFull ? "-translate-y-3" : "translate-y-6"
              }`}
            >
              {imageList.map((el, i) => (
                <div
                  className={`h-2 mx-0.5 w-2 bg-gray-300 ${
                    currentIndex === i && "bg-blue-500"
                  } rounded-full`}
                  key={i}
                ></div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostImageList;
