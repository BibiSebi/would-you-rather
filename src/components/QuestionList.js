import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ questions }) => {
  const getSortedQuestions = (questions) => {
    return questions.sort((a, b) => b.timestamp - a.timestamp);
  };
  return (
    <div className="flex flex-col items-center w-full">
      {getSortedQuestions(questions).map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
