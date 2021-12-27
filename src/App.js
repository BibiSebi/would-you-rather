import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { handleIntialData } from "./actions/shared";
import "./App.css";
import { LogInGuard } from "./guards/LogInGuard";
import useLocalStorage from "./hooks/useLocalStorage";
import Create from "./pages/Create";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import LogIn from "./pages/LogIn";
import Question from "./pages/Question";
import ProtectedRoute from "./routes/ProtectedRoute";
export const LocalStorageContext = React.createContext(null);

function App() {
  const dispatch = useDispatch();
  const [authedUser, setAuthedUser, clearValues] =
    useLocalStorage("authedUser");

  useEffect(() => {
    dispatch(handleIntialData());
  }, [dispatch]);

  return (
    <LocalStorageContext.Provider
      value={{ authedUser, setAuthedUser, clearValues }}
    >
      <div className="min-h-screen flex flex-col font-mono">
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute guards={[LogInGuard]} />}>
              <Route path="/" exact element={<Home />} />
              <Route path="questions/:id" element={<Question />} />
              <Route path="/leaderboard" exact element={<LeaderBoard />} />
              <Route path="/add" exact element={<Create />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LocalStorageContext.Provider>
  );
}

export default App;
