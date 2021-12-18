import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestionAnswer } from "../actions/questions";
import { addUserAnswer } from "../actions/user";
import Answer from "../components/Answer";
import { _saveQuestionAnswer } from "../utils/_DATA";
import Error from "./Error";
const Question = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions);
  const [question, setQuestion] = useState(null);
  const [showError, setShowError] = useState(false);
  const authedUser = JSON.parse(localStorage.getItem("authedUser"));

  const answerQuestion = (option) => {
    _saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer: option === 1 ? "optionOne" : "optionTwo",
    })
      .then(dispatch(addUserAnswer(authedUser, "optionOne", question.id)))
      .then(dispatch(addQuestionAnswer(authedUser, "optionOne", question.id)));
  };

  const navigateBackHome = () => {
    navigate("/");
  };

  //TODO: MAKE SHORTER
  const getResult = (option) => {
    const votes = [...question.optionOne.votes, ...question.optionTwo.votes];

    const userVoted = votes.some((vote) => vote === authedUser.toString());
    if (userVoted) {
      const percentageOptionOne =
        (100 / votes.length) * question.optionOne.votes.length;
      const percentageOptionTwo =
        (100 / votes.length) * question.optionTwo.votes.length;
      if (option === 1) {
        return {
          percentage: percentageOptionOne,
          hasMoreVotes:
            percentageOptionOne > percentageOptionTwo ? true : false,
        };
      }
      return {
        percentage: percentageOptionTwo,
        hasMoreVotes: percentageOptionTwo > percentageOptionOne ? true : false,
      };
    }
    return null;
  };

  useEffect(() => {
    const quest = questions[id];
    if (quest) {
      setQuestion(questions[id]);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }, [questions, id]);

  return !showError ? (
    <div className="h-full w-full flex items-center flex-col pt-16 flex-grow">
      {question && (
        <>
          <h1 className="text-5xl text-gray-500 pb-2 font-normal">
            Would you rather...
          </h1>
          <div className="w-1/2 flex flex-col items-center flex-grow pt-8">
            <Answer
              handleClick={() => answerQuestion(1)}
              result={getResult(1)}
              answer={question.optionOne}
            />
            <div className="flex w-full items-center">
              <hr className="flex-grow" />
              <span className="text-gray-500 text-lg px-1.5">or</span>
              <hr className="flex-grow" />
            </div>
            <Answer
              result={getResult(2)}
              handleClick={() => answerQuestion(2)}
              answer={question.optionTwo}
            />
            <button
              onClick={navigateBackHome}
              className="px-8 py-1 rounded-xl text-white bg-gray-500 mt-8"
            >
              Go back to homepage
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <Error id={id} />
  );
};

export default Question;