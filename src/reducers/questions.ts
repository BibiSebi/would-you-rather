import {
  ADD_QUESTION,
  ADD_QUESTION_ANSWER,
  RECEIVE_QUESTIONS,
} from "../actions/questions";

export default function questions(state: any = {}, action: any) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: [
              ...state[action.qid][action.answer].votes,
              action.authedUser,
            ],
          },
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: { ...action.question },
      };
    default:
      return state;
  }
}
