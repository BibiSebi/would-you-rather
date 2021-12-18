import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../actions/questions";
import { addUserQuesion } from "../actions/user";
import { _saveQuestion } from "../utils/_DATA";
import Input from "./Input";
const QuestionForm = () => {
  const authedUser = JSON.parse(localStorage.getItem("authedUser"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(authedUser, question));
        dispatch(addUserQuesion(authedUser, question.id));
      })
      .then(() => navigate("/"));
  };
  const changeOptionOne = (e) => {
    setOptionOne(e.target.value);
  };

  const changeOptionTwo = (e) => {
    setOptionTwo(e.target.value);
  };
  return (
    <form className="w-1/2 flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <Input
          value={optionOne}
          label="Option one"
          onChange={changeOptionOne}
        />
      </div>
      <div className="flex flex-col my-2">
        <Input
          value={optionTwo}
          label="Option two"
          onChange={changeOptionTwo}
        />
      </div>
      <button
        type="submit"
        disabled={!(optionOne && optionTwo)}
        className="px-8 py-1 rounded-xl text-white bg-gray-500 mt-16 disabled:opacity-50"
      >
        Create
      </button>
    </form>
  );
};

export default QuestionForm;
