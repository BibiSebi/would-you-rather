import { getInitialData } from "../utils/api";
import { hideLoading, showLoading } from "./loading";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./user";

export function handleIntialData() {
  return (dispatch: any) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
