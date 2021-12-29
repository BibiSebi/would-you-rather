import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogInCard from "../components/LogInCard";
import SignUp from "../components/SignUpCard";
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

  const changeTab = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.id === pathname.slice(1));
    setDocumentTitle(selectedTab.text);
    setSelectedTabId(selectedTab.id);
  }, [pathname, setSelectedTabId]);

  const getBorderClass = (id) => {
    const defaultBorderClasses = "border border-gray-400 border-t-0";
    return `${defaultBorderClasses} ${id === 0 ? "border-l-0" : "border-r-0"}`;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen py-40">
      <section className="flex flex-col	items-center border-gray-400 border w-full max-w-lg h-full rounded-xl">
        <div className="grid grid-cols-2 w-full">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={tab.id === selectedTabId}
              id="login-tab-id"
              aria-controls="login-panel-id"
              className={`py-3 text-xl  text-gray-500  ${
                tab.id !== selectedTabId && getBorderClass(idx)
              }`}
              onClick={() => changeTab(tab.id)}
            >
              {tab.text}
            </button>
          ))}
        </div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            aria-labelledby="login-tab-id"
            id="login-panel-id"
            className={`flex items-center flex-col flex-grow p-10 ${
              tab.id !== selectedTabId ? "hidden" : ""
            }`}
          >
            {tab.component}
          </div>
        ))}
      </section>
    </div>
  );
};

export default LogIn;
