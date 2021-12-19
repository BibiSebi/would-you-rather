import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chips from "../components/Chips";
import QuestionList from "../components/QuestionList";
import Spinner from "../components/Spinner";
const optionsDefault = [
  {
    value: "unanswered",
    text: "Unanswered",
    selected: true,
  },
  {
    value: "answered",
    text: "Answered",
    selected: false,
  },
];
const Home = () => {
  const [options, setOptions] = useState(optionsDefault);
  const authedUser = JSON.parse(localStorage.getItem("authedUser"));
  const { storeQuestions, loading } = useSelector((state) => ({
    storeQuestions: state.questions,
    loading: state.loading,
  }));
  const [questions, setQuestions] = useState([]);

  const handleClick = (selected) => {
    const sth = options.map((option) => {
      return {
        ...option,
        selected:
          option.value === selected ? !option.selected : option.selected,
      };
    });

    setOptions(sth);
  };

  useEffect(() => {
    const questions = Object.keys(storeQuestions).map(
      (key) => storeQuestions[key]
    );
    setQuestions(questions);
  }, [storeQuestions]);

  const getFilteredQuestions = (quesions) => {
    const selectedValues = options.reduce((acc, option) => {
      if (option.selected) {
        return [...acc, option.value];
      }
      return acc;
    }, []);

    if (!selectedValues.length > 0) {
      return quesions;
    }

    if (selectedValues.length === 1) {
      if (selectedValues[0] === "answered") {
        return quesions.filter((question) => {
          const votes = [
            ...question.optionOne.votes,
            ...question.optionTwo.votes,
          ];
          return votes.some((vote) => vote === authedUser);
        });
      } else if (selectedValues[0] === "unanswered") {
        return quesions.filter((question) => {
          const votes = [
            ...question.optionOne.votes,
            ...question.optionTwo.votes,
          ];
          return !votes.some((vote) => vote === authedUser);
        });
      }
    }

    return quesions;
  };

  return !loading ? (
    <div className="h-full w-full flex items-center flex-col pt-16 px-32">
      <div
        role="group"
        aria-labelledby="filter-title"
        className="w-full flex-col flex items-start"
      >
        <span id="filter-title" className="text-gray-500 mb-2 ml-2">
          Filter questions by:
        </span>
        <Chips options={options} handleClick={handleClick} />
      </div>

      {questions.length > 0 && (
        <QuestionList questions={getFilteredQuestions(questions)} />
      )}
    </div>
  ) : (
    <Spinner />
  );
};

export default Home;
