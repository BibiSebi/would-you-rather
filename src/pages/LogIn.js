import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListBox from "../components/Listbox";

const LogIn = () => {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState();
  const [error, setError] = useState(false);

  const onChangeUser = (user) => {
    if (setError) {
      setError(false);
    }
    setAuthedUser(user);
  };
  const handleLogin = (user) => {
    if (user) {
      localStorage.setItem("authedUser", JSON.stringify(user.id));
      navigate("/");
    }
    setError(true);
  };
  return (
    <div className="flex items-center justify-center  h-screen w-screen py-40">
      <section className="flex flex-col	items-center border  w-2/4 h-full rounded-xl">
        <div className="grid grid-cols-2 w-full">
          <button
            role="tab"
            aria-selected="true"
            id="login-tab-id"
            aria-controls="login-panel-id"
            className="py-3 text-xl  text-gray-500 border-t-0 border-b-0 border border-gray-200 border-l-0 border-r-0"
          >
            Log-In
          </button>
          <button
            role="tab"
            aria-selected="false"
            id="signup-tab-id"
            aria-controls="signup-panel-id"
            className="py-3 text-xl text-gray-500 border border-t-0 border-gray-200  border-r-0"
          >
            Sign-Up
          </button>
        </div>
        <div
          role="tabpanel"
          aria-labelledby="login-tab-id"
          id="login-panel-id"
          className="flex items-center flex-col flex-grow p-10"
        >
          <h1 className="text-5xl text-gray-500 pb-2  font-normal">Log In</h1>
          <span className="text-center w-9/12 text-gray-500 mb-16">
            You can either choose an existing account or create a new one to
            access the game.
          </span>

          <div className="w-4/5">
            <ListBox onChange={onChangeUser} />
            {error && (
              <span aria-live="true" className="w-full text-red-700">
                User is empty. Please try again.
              </span>
            )}
          </div>

          <button
            onClick={() => handleLogin(authedUser)}
            className="px-8 py-1 rounded-xl text-white bg-gray-500 mt-16"
          >
            Log In
          </button>
        </div>

        <div
          role="tabpanel"
          aria-labelledby="signup-tab-id"
          id="signup-panel-id"
        ></div>
      </section>
    </div>
  );
};

export default LogIn;
