import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchComments } from "../../redux/action/commentAction/actions";
import { fetchPostList } from "../../redux/action/postAction/actions";
import {
  fetchAllUsers,
  getCurrentUser,
} from "../../redux/action/userAction/actions";
import Header from "../Header";
import Modal from "../Modal";
import AccountModal from "../AccountModal";
import Footer from "../Footer";

const Container = ({ children }) => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) dispatch(getCurrentUser(uid));
  }, [uid, dispatch]);

  useEffect(() => {
    if (!uid) history.push("/login");
  }, [history, uid]);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchPostList());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <Header />
      <Modal />
      <AccountModal />
      <div className="pt-36 mx-auto md:max-w-4xl sm:max-w-full px-3 md:px-0">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Container;
