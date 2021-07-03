import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/action/modalAction/actions";

const Modal = () => {
  const modalReducer = useSelector((state) => state.modalReducer);
  const { modal, title, text, callback } = modalReducer;
  const dispatch = useDispatch();

  const handleOk = () => {
    if (callback) callback();
    dispatch(hideModal());
  };

  return modal ? (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen flex px-3 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded w-full lg:max-w-md md:max-w-lg">
        <h3>{title}</h3>
        <p className="mt-3">{text}</p>
        <div className="flex flex-row justify-end items-center mt-5">
          {callback && (
            <button
              onClick={() => dispatch(hideModal())}
              className="px-5 py-2 bg-transparent hover:bg-gray-200 rounded cursor-pointer focus:outline-none"
            >
              Cancle
            </button>
          )}
          <button
            onClick={handleOk}
            className="px-5 py-2 bg-rose-600 ml-3 text-white hover:bg-rose-500 rounded cursor-pointer focus:outline-none"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
