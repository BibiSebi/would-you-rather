import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogInCard from "../components/LogInCard";
import SignUp from "../components/SignUpCard";
import Tabs from "../components/Tabs";
import setDocumentTitle from "../utils/document-title";
const tabs = [
  {
    id: "login",
    text: "Log-In",
    selected: false,
    component: <LogInCard />,
  },
  {
    id: "signup",
    text: "Sign-Up",
    selected: false,
    component: <SignUp />,
  },
];
const LogIn = () => {
  const [selectedTabId, setSelectedTabId] = useState("login");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const changeTab = (id: string) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    const selectedTab: any = tabs.find((tab) => tab.id === pathname.slice(1));
    setDocumentTitle(selectedTab.text);
    setSelectedTabId(selectedTab.id);
  }, [pathname, setSelectedTabId]);

  return (
    <div className="flex items-center justify-center h-screen w-screen py-40">
      <section className="flex flex-col items-center border-gray-400 border w-full max-w-lg h-full rounded-xl">
        <Tabs tabs={tabs} onClick={changeTab} selectedTabId={selectedTabId} />
      </section>
    </div>
  );
};

export default LogIn;
