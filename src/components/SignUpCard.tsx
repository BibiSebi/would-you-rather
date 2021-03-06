import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../App";
import AvatarBoy1 from "../img/avatar-boy1.png";
import AvatarBoy2 from "../img/avatar-boy2.png";
import AvatarBoy3 from "../img/avatar-boy3.png";
import AvatarGirl1 from "../img/avatar-girl1.png";
import AvatarGirl2 from "../img/avatar-girl2.png";
import AvatarGirl3 from "../img/avatar-girl3.png";
import { IPictureSelect } from "../interfaces/picture-select";
import Button from "./Button";
import Input from "./Input";
import PictureSelect from "./PictureSelect";

const avatars: IPictureSelect[] = [
  {
    src: AvatarGirl1,
    title: "Female Avatar",
    selected: true,
  },
  {
    src: AvatarGirl2,
    title: "Female Avatar",
    selected: false,
  },
  {
    src: AvatarGirl3,
    title: "Female Avatar",
    selected: false,
  },
  {
    src: AvatarBoy1,
    title: "Female Avatar",
    selected: false,
  },
  {
    src: AvatarBoy2,
    title: "Female Avatar",
    selected: false,
  },
  {
    src: AvatarBoy3,
    title: "Female Avatar",
    selected: false,
  },
  {
    src: "",
    title: "Empty",
    selected: false,
  },
];

const SignUp = () => {
  const { setAuthedUser } = useContext(LocalStorageContext);
  const [error, setError] = useState(false);
  const username = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username?.current?.value) {
      setError(true);
    } else {
      setAuthedUser(username.current.value);
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
      <PictureSelect assets={avatars} label="Avatar" groupName="avatar-group" />
      <Input
        ref={username}
        label="Username"
        errorMsg="This field is required!"
        hasError={error}
      />
      <Button handleClick={handleLogin} className="mt-6" text="Login" />
    </>
  );
};

export default SignUp;
