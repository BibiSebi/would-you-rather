import { useContext } from "react";
import { LocalStorageContext } from "../App";

export const LogInGuard = (): boolean => {
  const { authedUser } = useContext(LocalStorageContext);
  try {
    return authedUser ? true : false;
  } catch (err) {
    return false;
  }
};
