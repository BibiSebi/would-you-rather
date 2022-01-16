import React, { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../actions/questions";
import { addUserQuesion } from "../actions/user";
import { LocalStorageContext } from "../App";
import { _saveQuestion } from "../utils/_DATA";
import Input from "./Input";
const QuestionForm = () => {
  const { authedUser } = useContext(LocalStorageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionOne = useRef<HTMLInputElement>(null);
  const optionTwo = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (optionOne.current && optionTwo.current) {
      _saveQuestion({
        optionOneText: optionOne.current.value,
        optionTwoText: optionTwo.current.value,
        author: authedUser,
      })
        .then((question) => {
          dispatch(addQuestion(authedUser, question));
          dispatch(addUserQuesion(authedUser, question.id));
        })
        .then(() => navigate("/"));
    }
  };

  return (
    <form className="w-1/2 flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <Input ref={optionOne} label="Option one" />
      </div>
      <div className="flex flex-col my-2">
        <Input ref={optionTwo} label="Option two" />
      </div>
      <button
        type="submit"
        className="px-8 py-1 rounded-xl text-white bg-gray-500 mt-16 disabled:opacity-50"
      >
        Create
      </button>
    </form>
  );
};

export default QuestionForm;
