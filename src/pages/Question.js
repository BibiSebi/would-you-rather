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

const initialResults = {
  optionOne: null,
  optionTwo: null,
};
const Question = () => {
  const { authedUser } = useContext(LocalStorageContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, loading, users } = useSelector((state) => ({
    questions: state.questions,
    loading: state.loading,
    users: state.users,
  }));
  const [question, setQuestion] = useState(null);
  const [author, setAuthor] = useState(null);
  const [showError, setShowError] = useState(false);
  const [results, setResults] = useState(initialResults);

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

  useEffect(() => {
    setDocumentTitle("Question Detail");
  }, []);

  const calculateAnswerPercentage = (nrOfVotes, nrOfAllVotes) => {
    const base = 100 / nrOfAllVotes;
    return (base * nrOfVotes).toFixed(2);
  };

  const setAnswerResults = (quest) => {
    const calculatedResults = {
      optionOne: getResult("optionOne", quest),
      optionTwo: getResult("optionTwo", quest),
    };

    setResults(calculatedResults);
  };

  const getResult = (optionType, quest) => {
    const allVotes = [...quest.optionOne.votes, ...quest.optionTwo.votes];
    const userVoted = allVotes.some((vote) => vote === authedUser);

    if (!userVoted) {
      return null;
    }

    return {
      selected: quest[optionType].votes.some((vote) => vote === authedUser),
      percentage: calculateAnswerPercentage(
        quest[optionType].votes.length,
        allVotes.length
      ),
    };
  };

  const updateValues = (allQuestions, questionId) => {
    const quest = allQuestions[questionId];

    if (!quest) {
      setShowError(true);
      return { quest: null, auth: null };
    }

    return { quest, auth: users[quest.author] };
  };

  const setUpdatedValue = (quest, auth) => {
    if (quest && auth) {
      setQuestion(quest);
      setAuthor(auth);
      setAnswerResults(quest);
    }
  };

  const synchWithStore = () => {
    const { quest, auth } = updateValues(questions, id);
    setUpdatedValue(quest, auth);
  };

  useEffect(() => {
    if (Object.keys(questions).length > 0 && Object.keys(users).length > 0) {
      synchWithStore();
    }
  }, [users, questions, loading]);

  if (loading) {
    return <Spinner />;
  }

  return !showError && question ? (
    <div className="h-full w-full flex items-center flex-col pt-16 flex-grow">
      <h1 className="text-5xl text-gray-500 font-normal pb-8">Question</h1>
      <section className="flex w-1/2 h-full flex-col justify-center items-center border borer-gray-500 rounded-lg p-8 relative">
        <div className=" flex items-center text-gray-500">
          <img
            className="rounded-full absolute right-4 top-2"
            src={author.avatarURL}
            alt=""
          />
          <span className="rounded-full absolute text-sm left-2 top-2">
            created by {author.name}
          </span>
        </div>

        <div className="flex flex-col items-center w-full flex-grow pt-12">
          <h2 className="text-3xl text-gray-500 pb-2 font-normal">
            Would you rather
          </h2>
          <Answer
            handleClick={() => answerQuestion("optionOne")}
            result={results.optionOne}
            answer={question.optionOne}
          />
          <div className="flex w-full items-center">
            <hr className="flex-grow" />
            <span className="text-gray-500 text-lg px-1.5">or</span>
            <hr className="flex-grow" />
          </div>
          <Answer
            handleClick={() => answerQuestion("optionTwo")}
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
