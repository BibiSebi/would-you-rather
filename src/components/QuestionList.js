import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ questions }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
