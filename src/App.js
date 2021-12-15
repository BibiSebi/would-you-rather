import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { handleIntialData } from "./actions/shared";
import "./App.css";
import { LogInGuard } from "./guards/LogInGuard";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
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
          </Route>
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
