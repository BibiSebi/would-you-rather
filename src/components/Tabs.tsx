import React from "react";
import { ITab } from "../interfaces/tabs.interface";

interface TabsComponent {
  tabs: ITab[];
  selectedTabId: string;
  onClick: (id: string) => void;
}

const Tabs = ({ tabs, selectedTabId, onClick }: TabsComponent) => {
  const getBorderClass = (id: number) => {
    const defaultBorderClasses = "border border-gray-400 border-t-0";
    return `${defaultBorderClasses} ${id === 0 ? "border-l-0" : "border-r-0"}`;
  };
  return (
    <>
      <div className="flex flex-row w-full">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={tab.id === selectedTabId}
            id="login-tab-id"
            aria-controls="login-panel-id"
            className={`py-3 text-xl  flex-grow text-gray-500  ${
              tab.id !== selectedTabId && getBorderClass(idx)
            }`}
            onClick={() => onClick(tab.id)}
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
          className={`flex h-full items-center flex-col flex-grow p-10 ${
            tab.id !== selectedTabId ? "hidden" : ""
          }`}
        >
          {tab.component}
        </div>
      ))}
    </>
  );
};

export default Tabs;
