import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ListBox from "./Listbox";

const LogInCard = () => {
  const navigate = useNavigate();

  const [authedUser, setAuthedUser] = useState();
  const [error, setError] = useState(false);

  const handleLogin = (user) => {
    if (user) {
      localStorage.setItem("authedUser", JSON.stringify(user.id));
      navigate("/");
    }
    setError(true);
  };
  const onChangeUser = (user) => {
    if (setError) {
      setError(false);
    }
    setAuthedUser(user);
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
          <span aria-live="true" className="w-full text-xs text-red-700">
            User is empty. Please try again.
          </span>
        )}
      </div>

      <Button handleClick={() => handleLogin(authedUser)} text="Login"></Button>
    </>
  );
};

export default LogInCard;
