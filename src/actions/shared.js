import { getInitialData } from "../utils/api";
import { receiveUsers } from "./user";
export function handleIntialData() {
  return (dispatch) => {
    return getInitialData().then(({ users }) => {
      dispatch(receiveUsers(users));
    });
  };
}
