import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { handleIntialData } from "./actions/shared";
import "./App.css";
import { LogInGuard } from "./guards/LogInGuard";
import Create from "./pages/Create";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import LogIn from "./pages/LogIn";
import Question from "./pages/Question";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleIntialData());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute guards={[LogInGuard]} />}>
            <Route path="/" exact element={<Home />} />
            <Route path="question/:id" element={<Question />} />
            <Route path="/leaderboard" exact element={<LeaderBoard />} />
            <Route path="/new" exact element={<Create />} />
          </Route>
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
