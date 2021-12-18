import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value && username.error) {
      setError(false);
    }
  };

  const handleLogin = () => {
    if (username.text === "") {
      setError(true);
    } else {
      console.log("here", username);
      localStorage.setItem("authedUser", JSON.stringify(username));
      navigate("/");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-thin text-gray-500 pb-2 text-center">
        Create a new account
      </h1>
      <span className="text-center w-9/12 text-gray-500 mb-8">
        Enter your username and login to create a new account.
      </span>

      <Input
        value={username}
        onChange={handleUsernameChange}
        label="Username"
        errorMsg="This field is required!"
        hasError={error}
      />
      <Button handleClick={handleLogin} className="mt-6" text="Login" />
    </>
  );
};

export default SignUp;
