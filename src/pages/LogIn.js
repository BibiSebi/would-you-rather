import React, { useState } from "react";
import LogInCard from "../components/LogInCard";
import SignUp from "../components/SignUpCard";

const tabsInitial = [
  {
    id: "login",
    text: "Log-In",
    selected: true,
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
  const [tabs, setTabs] = useState(tabsInitial);

  const changeTab = (id) => {
    const mapped = tabs.map((tab) =>
      tab.id === id ? { ...tab, selected: true } : { ...tab, selected: false }
    );

    setTabs(mapped);
  };

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
              role="tab"
              aria-selected={tab.selected}
              id="login-tab-id"
              aria-controls="login-panel-id"
              className={`py-3 text-xl  text-gray-500  ${
                !tab.selected && getBorderClass(idx)
              }`}
              onClick={() => changeTab(tab.id)}
            >
              {tab.text}
            </button>
          ))}
        </div>
        {tabs.map((tab) => (
          <div
            role="tabpanel"
            aria-labelledby="login-tab-id"
            id="login-panel-id"
            className={`flex items-center flex-col flex-grow p-10 ${
              !tab.selected ? "hidden" : ""
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
