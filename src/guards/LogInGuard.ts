import { useContext } from "react";
import { LocalStorageContext } from "../App";

export const LogInGuard = () => {
  const { authedUser }: any = useContext(LocalStorageContext);
  try {
    return authedUser ? true : false;
  } catch (err) {
    return false;
  }
};
