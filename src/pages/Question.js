import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestionAnswer } from "../actions/questions";
import { addUserAnswer } from "../actions/user";
import { LocalStorageContext } from "../App";
import Answer from "../components/Answer";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import setDocumentTitle from "../utils/document-title";
import { _saveQuestionAnswer } from "../utils/_DATA";
import Error from "./Error";

const Question = () => {
  const { authedUser } = useContext(LocalStorageContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, loading } = useSelector((state) => ({
    questions: state.questions,
    loading: state.loading,
  }));
  const [question, setQuestion] = useState(null);
  const [showError, setShowError] = useState(false);

  const answerQuestion = (option) => {
    _saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer: option,
    })
      .then(dispatch(addUserAnswer(authedUser, option, question.id)))
      .then(dispatch(addQuestionAnswer(authedUser, option, question.id)));
  };

  const navigateBackHome = () => {
    navigate("/");
  };

  const getResult = (option) => {
    const votes = [...question.optionOne.votes, ...question.optionTwo.votes];

    const userVoted = votes.some((vote) => vote === authedUser.toString());
    if (userVoted) {
      const { percentageOne, percentageTwo } = calculateAnswersPercentage(
        question,
        votes.length
      );

      if (option === 1) {
        return {
          percentage: percentageOne,
          hasMoreVotes: percentageOne > percentageTwo,
        };
      }
      return {
        percentage: percentageTwo,
        hasMoreVotes: percentageTwo > percentageOne,
      };
    }
    return null;
  };

  const calculateAnswersPercentage = (question, nrOfVotes) => {
    const base = 100 / nrOfVotes;
    return {
      percentageOne: (base * question.optionOne.votes.length).toFixed(2),
      percentageTwo: (base * question.optionTwo.votes.length).toFixed(2),
    };
  };

  useEffect(() => {
    setDocumentTitle("Question Detail");
  }, []);

  useEffect(() => {
    const quest = questions[id];
    if (quest) {
      setQuestion(questions[id]);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }, [questions, id]);

  //TODO split
  return !loading ? (
    <div className="h-full w-full flex items-center flex-col pt-16 flex-grow">
      {!showError && question ? (
        <>
          <h1 className="text-5xl text-gray-500 pb-2 font-normal">
            Would you rather...
          </h1>
          <div className="w-1/2 flex flex-col items-center flex-grow pt-8">
            <Answer
              handleClick={() => answerQuestion("optionOne")}
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
              handleClick={() => answerQuestion("optionTwo")}
              answer={question.optionTwo}
            />
            <Button
              text="Go back to homepage"
              handleClick={navigateBackHome}
              className="mt-8"
            />
          </div>
        </>
      ) : (
        <Error id={id} />
      )}
    </div>
  ) : (
    <Spinner />
  );
};

export default Question;
