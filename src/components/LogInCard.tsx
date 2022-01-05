import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../App";
import { IUser } from "../interfaces/users.interface";
import Button from "./Button";
import ListBox from "./Listbox";

const LogInCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthedUser } = useContext(LocalStorageContext);

  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState(false);

  const handleLogin = (user: IUser | null) => {
    if (user && user.id) {
      setAuthedUser(user.id);
      if (location.state) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } else {
      setError(true);
    }
  };
  const onChangeUser = (user: IUser | null) => {
    if (setError) {
      setError(false);
    }
    setUser(user);
  };
  return (
    <>
      <h1 className="text-4xl text-gray-500 pb-2  font-normal">Log-In</h1>
      <span className="text-center w-9/12 text-gray-500 mb-8">
        You can either choose an existing account or create a new one to access
        the game.
      </span>

      <div className="w-full mb-8">
        <ListBox onChange={onChangeUser} isError={error} />
        {error && (
          <span aria-live="assertive" className="w-full text-xs text-red-700">
            User is empty. Please try again.
          </span>
        )}
      </div>

      <Button handleClick={() => handleLogin(user)} text="Login"></Button>
    </>
  );
};

export default LogInCard;
