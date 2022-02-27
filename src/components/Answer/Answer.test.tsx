import { cleanup, render, screen } from "@testing-library/react";
import { IResult } from "../../interfaces/questions.interface";
import Answer from "./Answer";
afterEach(cleanup);

describe("<Answer />", () => {
  it("should initialize answer button", () => {
    const answer = { text: "Answer", votes: ["johndoe"] };
    const result: IResult | null = null;
    render(<Answer answer={answer} handleClick={() => null} result={result} />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Answer");
  });

  it("should initialize answer", () => {
    const answer = { text: "Answered", votes: ["johndoe"] };
    const result: IResult | null = { percentage: 90, selected: true };
    render(<Answer answer={answer} handleClick={() => null} result={result} />);
    expect(screen.getByTestId("answered-text")).toHaveTextContent(
      "1 person answered"
    );
  });
});
