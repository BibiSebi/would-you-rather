import React, { useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
import setDocumentTitle from "../utils/document-title";
const Create = () => {
  useEffect(() => {
    setDocumentTitle("Create");
  }, []);

  return (
    <div className="w-full flex items-center flex-col pt-16">
      <div className="flex flex-col items-center w-1/2 mb-16">
        <h1
          aria-describedby="create-description"
          className="text-5xl text-gray-500 pb-2 text-center font-thin"
        >
          Would you rather...?
        </h1>
        <span
          id="create-description"
          className="text-gray-500 px-24 text-center"
        >
          Create a new poll by enterings your questions. Gather points for each
          poll.
        </span>
      </div>

      <QuestionForm />
    </div>
  );
};

export default Create;
