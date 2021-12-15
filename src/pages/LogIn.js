import React from "react";
import ListBox from "../components/Listbox";

const LogIn = () => {
  return (
    <div className="flex items-center justify-center  h-screen w-screen py-40">
      <section className="flex flex-col	items-center border w-2/4 h-full">
        <div className="grid grid-cols-2 w-full">
          <button
            role="tab"
            aria-selected="true"
            id="login-tab-id"
            aria-controls="login-panel-id"
            className="py-2 text-xl text-gray-500 border border-gray-200 "
          >
            Log-In
          </button>
          <button
            role="tab"
            aria-selected="false"
            id="signup-tab-id"
            aria-controls="signup-panel-id"
            className="px-4 py-1 text-xl text-gray-500 border border-gray-200 "
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
          <h1 className="text-5xl">Log In</h1>
          <span className="text-center mb-8">
            You can either choose an existing account or create a new one to
            access the game.
          </span>

          <ListBox />

          <button className="px-4 py-1 rounded-xl border mt-8">Log In</button>
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
