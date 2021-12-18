import React from "react";
import QuestionForm from "../components/QuestionForm";

const Create = () => {
  return (
    <div className="w-full flex items-center flex-col pt-16">
      <div className="flex flex-col items-center w-1/2 mb-16">
        <h1 className="text-5xl text-gray-500 pb-2 font-thin">
          Would you rather....
        </h1>
        <span className="text-gray-500 px-24 text-center">
          Create a new poll by enterings your questions. Gather points for each
          poll.
        </span>
      </div>

      <QuestionForm />
    </div>
  );
};

export default Create;
