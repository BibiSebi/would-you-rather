import React from "react";

const QuestionCard = ({ question }) => {
  return (
    <button className="border border-gray-200 w-full px-8 py-12 rounded-xl my-4 relative hover:bg-red-100">
      <span className="absolute left-4 top-1 text-gray-500">
        Created by {question.author}
      </span>
      <span className="text-gray-500 text-2xl">
        Would you rather {question.optionOne.text} or ...?
      </span>
      <span className="absolute text-gray-500 bottom-1 right-4">
        {question.optionOne.votes.length + question.optionTwo.votes.length}{" "}
        people answered
      </span>
    </button>
  );
};

export default QuestionCard;
