import { combineReducers } from "redux";
import loading from "./loading";
import questions from "./questions";
import users from "./user";

export default combineReducers({
  users,
  questions,
  loading,
});
