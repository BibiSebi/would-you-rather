import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LocalStorageContext } from "../App";
import { IChip } from "../components/Chip";
import Chips from "../components/Chips";
import QuestionList from "../components/QuestionList";
import Spinner from "../components/Spinner";
import { IQuestion } from "../interfaces/questions.interface";
import { IState } from "../interfaces/state.interface";
import setDocumentTitle from "../utils/document-title";
const chipsDefault: IChip[] = [
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
  const [options, setOptions] = useState(chipsDefault);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const { authedUser } = useContext(LocalStorageContext);
  const { storeQuestions, loading } = useSelector((state: IState) => ({
    storeQuestions: state.questions,
    loading: state.loading,
  }));
  const handleChipClick = (value: string) => {
    const updatedOptions = options.map((option) => {
      if (option.value === value) {
        return {
          ...option,
          selected: !option.selected,
        };
      }
      return option;
    });

    setOptions(updatedOptions);
  };

  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  useEffect(() => {
    const questionsAsArray = Object.keys(storeQuestions)
      .map((key) => storeQuestions[key])
      ?.sort((a, b) => b.timestamp - a.timestamp);

    setQuestions(questionsAsArray);
  }, [storeQuestions]);

  const getSelectedOptions = () => {
    return options.reduce((acc, option): any => {
      if (option.selected) {
        return [...acc, option.value];
      }
      return acc;
    }, []);
  };

  // TODO: combine the two following functions
  const getAnsweredQuestions = () => {
    return questions.filter((question: IQuestion) => {
      const votes = [...question.optionOne.votes, ...question.optionTwo.votes];
      return votes.some((vote) => vote === authedUser);
    });
  };

  const getUnansweredQuestions = () => {
    return questions.filter((question: IQuestion) => {
      const votes = [...question.optionOne.votes, ...question.optionTwo.votes];
      return !votes.some((vote) => vote === authedUser);
    });
  };

  const getFilteredQuestions = (quesions: IQuestion[]) => {
    const selectedValues = getSelectedOptions();

    if (selectedValues.length === 1) {
      const selectedOption = selectedValues[0];

      if (selectedOption === "answered") {
        return getAnsweredQuestions();
      } else if (selectedOption === "unanswered") {
        return getUnansweredQuestions();
      }
    }

    return quesions;
  };

  return !loading ? (
    <div className="h-full w-full flex items-center flex-col pt-16 px-32">
      <h1 className="text-5xl self-center text-gray-500 pb-2 text-center font-thin">
        Home
      </h1>
      <div
        role="group"
        aria-labelledby="filter-title"
        className="w-full flex-col flex items-start"
      >
        <span id="filter-title" className="text-gray-500 mb-2 ml-2">
          Filter questions by:
        </span>
        <Chips options={options} handleClick={handleChipClick} />
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
