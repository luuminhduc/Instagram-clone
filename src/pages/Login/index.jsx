import React from "react";
import LoginImg from "../../images/undraw_Sign_in_re_o58h.png";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoginError,
  loginRequest,
} from "../../redux/action/loginAction/actions";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(loginRequest(data, history));
  };

  const loginReducer = useSelector((state) => state.loginReducer);
  const { loginError } = loginReducer;

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;

  useEffect(() => {
    if (uid) history.push("/");
  }, [uid, history]);

  return (
    <div className=" px-3 flex justify-start pt-10 items-center flex-col min-h-screen w-full">
      <div className="w-full p-4 md:max-w-xl lg:max-w-lg xl:max-w-md">
        <img
          src={LoginImg}
          className=" h-52 mx-auto p-4 mb-5 rounded-full"
          alt=""
        />
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="mb-3 flex flex-col justify-start items-start">
            <input
              {...register("email", { required: true })}
              type="text"
              className={`p-4 rounded ${
                errors.email && "border-2 border-solid border-red-500"
              } focus:outline-none focus:shadow-lg bg-trueGray-100 w-full shadow-sm`}
              placeholder="Name"
            />
            {errors.email && errors.email.type === "required" && (
              <small className="text-red-500 text-sm">
                Email can not be blank
              </small>
            )}
          </div>
          <div className="mb-3 flex flex-col justify-start items-start">
            <input
              {...register("password", { required: true })}
              type="password"
              className={`p-4 rounded ${
                errors.password && "border-2 border-solid border-red-500"
              } focus:outline-none focus:shadow-lg bg-trueGray-100 w-full shadow-sm`}
              placeholder="Password"
            />
            {errors.password && errors.password.type === "required" && (
              <small className="text-red-500 text-sm">
                Password can not be blank
              </small>
            )}
          </div>
          <div className="mb-3 text-sm text-trueGray-400">
            Do not have an account yet?{" "}
            <NavLink
              className="text-true text-trueGray-800 hover:text-trueGray-900"
              to="/register"
            >
              Register
            </NavLink>
          </div>
          {loginError && (
            <div className="mb-3 bg-red-500 text-white p-4 rounded relative">
              {loginError}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => dispatch(hideLoginError())}
                className="h-5 w-5 absolute top-1 right-1 cursor-pointer"
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
          )}
          <button
            type="submit"
            className="w-full p-4 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 focus:outline-none focus:scale-95 transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
