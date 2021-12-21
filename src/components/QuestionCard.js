import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const getPeopleAnswered = (count) => {
    return `${count} ${count === 1 ? "person" : "people"} answered`;
  };

  return (
    <Link
      to={`question/${question.id}`}
      className="border border-gray-400 w-full px-10 py-12 rounded-xl my-4 relative hover:bg-red-100"
    >
      <span className="absolute left-4 top-1 text-gray-500">
        Created by {question.author}
      </span>
      <span className="text-gray-500 text-2xl">
        Would you rather {question.optionOne.text} or ...?
      </span>
      <span className="absolute text-gray-500 bottom-1 right-4">
        {getPeopleAnswered(
          question.optionOne.votes.length + question.optionTwo.votes.length
        )}
      </span>
    </Link>
  );
};

export default QuestionCard;
