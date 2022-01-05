export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export function receiveUsers(users: any) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUserAnswer(userId: any, answer: any, qid: any): any {
  return {
    type: ADD_USER_ANSWER,
    userId,
    answer,
    qid,
  };
}

export function addUserQuesion(authedUser: any, qid: any): any {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid,
  };
}
