import { OptionEnum } from "./../enums/question.enum";
import { IQuestion, IQuestions } from "./../interfaces/questions.interface";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export function receiveQuestions(questions: IQuestions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestionAnswer(
  authedUser: string,
  answer: OptionEnum,
  qid: string
): any {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    answer,
    qid,
  };
}

export function addQuestion(authedUser: string, question: IQuestion): any {
  return {
    type: ADD_QUESTION,
    authedUser,
    question,
  };
}
