import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ questions }) => {
  return (
    <div className="flex flex-col items-center w-1/2 ">
      {questions.map((question) => (
        <QuestionCard question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
