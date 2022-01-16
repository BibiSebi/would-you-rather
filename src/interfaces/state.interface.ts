import { IQuestions } from "./questions.interface";
import { IUsers } from "./users.interface";

export interface IState {
  authedUser: string;
  questions: IQuestions;
  users: IUsers;
  loading: boolean;
}
