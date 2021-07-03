import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
export default combineReducers({
    firebaseReducer,
    loginReducer,
    registerReducer,
    userReducer,
    postReducer,
    modalReducer,
})