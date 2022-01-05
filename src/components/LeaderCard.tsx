import React from "react";
const LeaderCard = ({ user }: any) => {
  return (
    <div
      key={user.id}
      className="border w-full rounded-lg text-gray-500  items-center border-gray-400 py-4 px-8 my-4 flex"
    >
      <img alt="" className="rounded-full h-16 w-16" src={user.avatarURL} />
      <div className="flex-grow flex flex-col px-4">
        <span className="text-4xl font-thin mb-4">{user.name}</span>
        <div className="flex font-thin">
          <span className="mr-4">Created: {user.questions.length}</span>
          <span>Answered: {Object.keys(user.answers).length}</span>
        </div>
      </div>

      <div className="flex font-thin items-end">
        <span className="text-6xl ">
          {user.questions.length + Object.keys(user.answers).length}
        </span>
        <span>pts</span>
      </div>
    </div>
  );
};

export default LeaderCard;
