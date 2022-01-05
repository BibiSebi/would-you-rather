import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ questions }: any) => {
  return (
    <div className="flex flex-col items-center w-full">
      {questions.map((question: any) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
