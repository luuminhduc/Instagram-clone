import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/action/userAction/actions";
import { fileListToBase64 } from "../../utilities/fileHook";

const EditInfo = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;

  const [clientAvatar, setClientAvatar] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const [user, setUser] = useState();

  const dispatch = useDispatch();

  const watchAvartar = watch("avatar");

  const onSubmit = (data) => {
    const userInfo = {
      ...data,
      avatar: clientAvatar,
      email: user.email,
      followerList: user.followerList,
      followingList: user.followingList,
    };
    dispatch(updateUserInfo(userInfo, uid));
  };
  useEffect(() => {
    if (user) {
      const { name, userName, avatar, phoneNumber, gender, about } = user;
      setValue("name", name);
      setValue("userName", userName);
      setValue("phoneNumber", phoneNumber);
      setValue("gender", gender);
      setValue("about", about);
      setClientAvatar(avatar);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (uid) setUser(userList.find((el) => el.id === uid));
  }, [uid, userList]);

  useEffect(() => {
    if (watchAvartar && watchAvartar.length > 0) {
      fileListToBase64(watchAvartar).then((arr) => {
        setClientAvatar(arr[0]);
      });
    }
  }, [watchAvartar]);

  const editInfo = () => {
    return (
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {/* AVATAR */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            {clientAvatar ? (
              <img
                src={clientAvatar}
                alt=""
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 bg-gray-300 rounded-full p-2 text-white w-12"
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
              </div>
            )}
          </div>
          <div className="md:w-2/3">
            <div className="md:mr-5 flex flex-col justify-start items-start">
              <div className="overflow-hidden relative w-28 cursor-pointer">
                <button
                  className={`border border-gray-200 border-solid py-3 w-full text-sm rounded text-coolGray-400 cursor-pointer`}
                >
                  Avatar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 inline-block w-6"
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
                  accept="image/*"
                  {...register("avatar")}
                  className={`cursor-pointer absolute top-0 left-0 opacity-0 w-full h-full pin-r pin-t`}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>

        {/* NAME */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            <label className="">Name</label>
          </div>
          <div className="md:w-2/3 w-full">
            <input
              {...register("name")}
              type="text"
              className="px-2 py-1 focus:outline-none focus:border-blue-600 border w-full border-solid border-gray-200"
              placeholder="Name"
            />
          </div>
        </div>

        {/* USER NAME */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            <label className="">User name</label>
          </div>

          <div className="md:w-2/3 w-full">
            <input
              {...register("userName", { required: true })}
              type="text"
              className={`px-2 py-1 focus:outline-none focus:border-blue-600 border w-full border-solid border-gray-200 ${
                errors.userName && "border-red-500"
              }`}
              placeholder="User name"
            />
            {errors.userName && (
              <small className="text-red-500 text-sm">
                User name can not be blank
              </small>
            )}
          </div>
        </div>

        {/* About */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            <label className="">About</label>
          </div>
          <div className="md:w-2/3 w-full">
            <textarea
              rows="5"
              {...register("about")}
              type="text"
              className="px-2 py-2 focus:outline-none focus:border-blue-600 border w-full border-solid border-gray-200"
              placeholder="About"
            />
          </div>
        </div>

        {/* GENDER */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            <label className="">Gender</label>
          </div>
          <div className="md:w-2/3 w-full">
            <select
              {...register("gender")}
              className="px-2 py-1 focus:outline-none focus:border-blue-600 border w-full border-solid border-gray-200"
            >
              <option value="male">Male</option>
              <option value="female">Femail</option>
            </select>
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div className="flex mb-5 flex-col md:flex-row justify-start items-start">
          <div className="md:w-1/3">
            <label className="">Phone number</label>
          </div>
          <div className="md:w-2/3 w-full">
            <input
              {...register("phoneNumber")}
              type="text"
              className="px-2 py-1 focus:outline-none focus:border-blue-600 border w-full border-solid border-gray-200"
              placeholder="Phone number"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-500 focus:outline-none"
        >
          Save
        </button>
      </form>
    );
  };

  return <div>{user && editInfo()}</div>;
};

export default EditInfo;
