export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestionAnswer(authedUser, answer, qid) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    answer,
    qid,
  };
}

export function addQuestion(authedUser, question) {
  return {
    type: ADD_QUESTION,
    authedUser,
    question,
  };
}
