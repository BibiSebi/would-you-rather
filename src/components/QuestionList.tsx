import React from "react";
import { IQuestion } from "../interfaces/questions.interface";
import QuestionCard from "./QuestionCard";

interface IQuestionListComponent {
  questions: IQuestion[];
}
const QuestionList = ({ questions }: IQuestionListComponent) => {
  return (
    <div className="flex flex-col items-center w-full">
      {questions.map((question: IQuestion) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
