import { combineReducers } from "redux";
import questions from "./questions";
import users from "./user";

export default combineReducers({
  users,
  questions,
});
