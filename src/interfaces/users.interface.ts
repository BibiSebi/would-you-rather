export interface IUser {
  id: string;
  name: string;
  avatarURL: string;
  answers: IAnswers;
  questions: string[];
}

export interface IAnswers {
  [questionId: string]: string;
}

export interface IUsers {
  [name: string]: IUser;
}
