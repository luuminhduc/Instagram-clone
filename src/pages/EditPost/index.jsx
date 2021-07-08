import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fileListToBase64 } from "../../utilities/fileHook";
import { timeStamp } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import { addPost } from "../../redux/action/postAction/actions";

const EditPost = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { currentUser } = userReducer;

  const [imageList, setImageList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const { register, watch } = useForm();

  const watchImg = watch("images");

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (watchImg && watchImg.length > 0) {
      fileListToBase64(watchImg).then((arr) => setImageList(arr));
    }
  }, [watchImg]);

  const handlePost = () => {
    const post = {
      text: watch("text"),
      imageList,
      time: timeStamp(),
      uid: currentUser.id,
      likes: [],
    };
    dispatch(addPost(post, history));
  };

  const userInfo = () => {
    const { userName, email, avatar } = currentUser;
    return (
      <div className="flex flex-row justify-start items-center">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-full mr-3 w-14 h-14"
          />
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
        <span>{userName ? userName : email}</span>
      </div>
    );
  };

  return currentUser ? (
    <div className="w-full bg-white p-5 rounded-sm border border-solid border-gray-200">
      {userInfo()}
      <textarea
        {...register("text", { required: true })}
        rows="4"
        type="text"
        className="w-full text-2xl mt-5 focus:outline-none mb-3"
        placeholder="Type something..."
      />
      {imageList.length > 0 && (
        <div>
          <img src={imageList[currentIdx]} className="mb-5" alt="Something" />
          <div className="grid grid-cols-12 gap-5">
            {imageList.map((el, idx) => (
              <img
                key={idx}
                alt="Hello"
                onClick={() => setCurrentIdx(idx)}
                className="cursor-pointer"
                src={el}
              />
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-solid border-gray-200 pt-5 flex flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start">
          <div className="overflow-hidden relative w-auto cursor-pointer">
            <button
              className={`w-full text-sm rounded text-coolGray-400 cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 inline-block w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <input
              {...register("images", { required: true })}
              accept="image/*"
              className={`cursor-pointer absolute top-0 left-0 opacity-0 w-full h-full pin-r pin-t`}
              type="file"
              multiple
            />
          </div>
        </div>
        <button
          onClick={handlePost}
          disabled={watch("text") || watch("images")?.length > 0 ? false : true}
          className={`px-7 py-3  text-white ${
            watch("images")?.length <= 0 || !watch("text")
              ? "bg-gray-300 cursor-not-allowed"
              : "cursor-pointer bg-blue-600 hover:bg-blue-500"
          }  rounded  focus:outline-none`}
        >
          Post
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditPost;
