import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestionAnswer } from "../actions/questions";
import { addUserAnswer } from "../actions/user";
import { LocalStorageContext } from "../App";
import Answer from "../components/Answer/Answer";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { OptionEnum } from "../enums/question.enum";
import { IState } from "../interfaces/state.interface";
import setDocumentTitle from "../utils/document-title";
import { _saveQuestionAnswer } from "../utils/_DATA";
import Error from "./Error";

const initialResults = {
  optionOne: null,
  optionTwo: null,
};
const Question = () => {
  const { authedUser } = useContext(LocalStorageContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { question, loading, user } = useSelector((state: IState) => ({
    question: id ? state.questions[id] : null,
    loading: state.loading,
    user: id ? state.users[state.questions[id]?.author] : null,
  }));
  const [results, setResults] = useState<any>(initialResults);

  const answerQuestion = (option: OptionEnum) => {
    if (id) {
      _saveQuestionAnswer({
        authedUser,
        qid: id,
        answer: option,
      })
        .then(dispatch(addUserAnswer(authedUser, option, id)))
        .then(dispatch(addQuestionAnswer(authedUser, option, id)));
    }
  };

  const navigateBackHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setDocumentTitle("Question Detail");
  }, []);

  const calculateAnswerPercentage = useCallback((nrOfVotes, nrOfAllVotes) => {
    const base = 100 / nrOfAllVotes;
    return (base * nrOfVotes).toFixed(2);
  }, []);

  const getResult = useCallback(
    (optionType, quest) => {
      const allVotes = [...quest.optionOne.votes, ...quest.optionTwo.votes];
      const userVoted = allVotes.some((vote) => vote === authedUser);

      if (!userVoted) {
        return null;
      }

      return {
        selected: quest[optionType].votes.some(
          (vote: string) => vote === authedUser
        ),
        percentage: calculateAnswerPercentage(
          quest[optionType].votes.length,
          allVotes.length
        ),
      };
    },
    [calculateAnswerPercentage, authedUser]
  );

  useEffect(() => {
    if (question && user) {
      const calculatedResults = {
        optionOne: getResult(OptionEnum.OptionOne, question),
        optionTwo: getResult(OptionEnum.OptionTwo, question),
      };

      setResults(calculatedResults);
    }
  }, [user, question, loading, getResult]);

  if (loading) {
    return <Spinner />;
  }

  return question && user ? (
    <div className="h-full w-full flex items-center flex-col pt-16 flex-grow">
      <h1 className="text-5xl text-gray-500 font-normal pb-8">Question</h1>
      <section className="flex w-1/2 h-full flex-col justify-center items-center border borer-gray-500 rounded-lg p-8 relative">
        <div className=" flex items-center text-gray-500">
          <img
            className="rounded-full absolute right-4 top-2"
            src={user.avatarURL}
            alt=""
          />
          <span className="rounded-full absolute text-sm left-2 top-2">
            created by {user.name}
          </span>
        </div>

        <div className="flex flex-col items-center w-full flex-grow pt-12">
          <h2 className="text-3xl text-gray-500 pb-2 font-normal">
            Would you rather
          </h2>
          <Answer
            handleClick={() => answerQuestion(OptionEnum.OptionOne)}
            result={results.optionOne}
            answer={question.optionOne}
          />
          <div className="flex w-full items-center">
            <hr className="flex-grow" />
            <span className="text-gray-500 text-lg px-1.5">or</span>
            <hr className="flex-grow" />
          </div>
          <Answer
            handleClick={() => answerQuestion(OptionEnum.OptionTwo)}
            result={results.optionTwo}
            answer={question.optionTwo}
          />
        </div>
      </section>
      <Button
        text="Go back to homepage"
        handleClick={navigateBackHome}
        className="mt-8"
      />
    </div>
  ) : (
    <Error id={id} />
  );
};

export default Question;
