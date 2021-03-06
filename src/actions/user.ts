import { OptionEnum } from "./../enums/question.enum";
import { IUsers } from "./../interfaces/users.interface";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export function receiveUsers(users: IUsers) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUserAnswer(
  userId: string,
  answer: OptionEnum,
  qid: string
): any {
  return {
    type: ADD_USER_ANSWER,
    userId,
    answer,
    qid,
  };
}

export function addUserQuesion(authedUser: string, qid: string): any {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid,
  };
}
