export interface IQuestion {
  id: string;
  author: string;
  timestamp: number;
  optionOne: IOption;
  optionTwo: IOption;
}

export interface IOption {
  votes: string[];
  text: string;
}
