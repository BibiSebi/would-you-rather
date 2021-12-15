import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionList from "../components/QuestionList";
const Home = () => {
  const storeQuestions = useSelector((state) => state.questions);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsArr = Object.keys(storeQuestions).map(
      (key) => storeQuestions[key]
    );
    setQuestions(questionsArr);
  }, [storeQuestions]);

  return (
    <div className="h-full w-full flex items-center flex-col pt-16">
      <span>Hello</span>
      {questions.length > 0 && <QuestionList questions={questions} />}
    </div>
  );
};

export default Home;
