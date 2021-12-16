import { ADD_USER_ANSWER, RECEIVE_USERS } from "../actions/user";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER_ANSWER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.qid]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
