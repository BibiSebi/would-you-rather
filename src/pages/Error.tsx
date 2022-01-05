import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import setDocumentTitle from "../utils/document-title";

const Error = ({ id }: any) => {
  useEffect(() => {
    setDocumentTitle("Error");
  }, []);

  return (
    <div className="w-full h-full items-center  pt-16 flex flex-grow flex-col">
      <h1 className="text-gray-500 text-9xl">404</h1>
      <span className="text-gray-500 text-xl">
        Question with id: {id} could not be fond. Try again later!
      </span>
      <Link
        to="/"
        className="rounded-full bg-gray-500 text-white py-1 px-8 mt-8"
      >
        Home
      </Link>
    </div>
  );
};

export default Error;
