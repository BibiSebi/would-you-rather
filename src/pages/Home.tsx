import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LocalStorageContext } from "../App";
import { IChip } from "../components/Chip";
import Chips from "../components/Chips";
import QuestionList from "../components/QuestionList";
import Spinner from "../components/Spinner";
import { IQuestion } from "../interfaces/questions.interface";
import { IState } from "../interfaces/state.interface";
import ArrayUtils from "../utils/array";
import setDocumentTitle from "../utils/document-title";

export enum QuestionTypeEnum {
  Answered = "answered",
  Unanswered = "unanswered",
}

const chipsDefault: IChip[] = [
  {
    value: QuestionTypeEnum.Unanswered,
    text: "Unanswered",
    selected: true,
  },
  {
    value: QuestionTypeEnum.Answered,
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

  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  useEffect(() => {
    const questionsAsArray = Object.keys(storeQuestions)
      .map((key) => storeQuestions[key])
      ?.sort((a, b) => b.timestamp - a.timestamp);

    setQuestions(questionsAsArray);
  }, [storeQuestions]);

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

  const getSelectedQuestions = (): any[] => {
    const selectedOptions = getSelectedOptions();
    return getQuestionsBySelectedOptions(selectedOptions);
  };

  const getQuestionsBySelectedOptions = (selectedOptions: IChip[]) => {
    if (ArrayUtils.isEmpty(selectedOptions)) {
      return questions;
    }

    let selectedQuestions: IQuestion[] = [];

    for (const option of selectedOptions) {
      if (!option.selected) {
        continue;
      }

      selectedQuestions = [
        ...selectedQuestions,
        ...getQuestionByType(option.value),
      ];
    }

    return selectedQuestions;
  };

  const getSelectedOptions = (): IChip[] => {
    return options.filter((option) => option.selected);
  };

  const getQuestionByType = (type: QuestionTypeEnum): IQuestion[] => {
    switch (type) {
      case QuestionTypeEnum.Answered:
        return getAnsweredQuestions();
      case QuestionTypeEnum.Unanswered:
        return getUnansweredQuestions();
      default:
        return [];
    }
  };

  // // TODO: combine the two following functions
  const getAnsweredQuestions = (): IQuestion[] => {
    return questions.filter((question: IQuestion) => {
      const votes = [...question.optionOne.votes, ...question.optionTwo.votes];
      return votes.some((vote) => vote === authedUser);
    });
  };

  const getUnansweredQuestions = (): IQuestion[] => {
    return questions.filter((question: IQuestion) => {
      const votes = [...question.optionOne.votes, ...question.optionTwo.votes];
      return !votes.some((vote) => vote === authedUser);
    });
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
        <QuestionList questions={getSelectedQuestions()} />
      )}
    </div>
  ) : (
    <Spinner />
  );
};

export default Home;
