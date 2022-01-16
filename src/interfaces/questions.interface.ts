export interface IQuestion {
  id: string;
  author: string;
  timestamp: number;
  optionOne: IOption;
  optionTwo: IOption;
}

export interface IQuestions {
  [name: string]: IQuestion;
}

export interface IOption {
  votes: string[];
  text: string;
}

export interface IResult {
  percentage: number;
  selected: boolean;
}
