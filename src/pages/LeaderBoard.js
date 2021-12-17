import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [sortedUsers, setSortedUsers] = useState([]);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const usersArr = Object.keys(users).map((user) => users[user]);
    if (usersArr) {
      const sorted = usersArr.sort(
        (a, b) =>
          Object.keys(b.answers).length +
          b.questions.length -
          (Object.keys(a.answers).length + a.questions.length)
      );
      setSortedUsers(sorted);
    }
  }, [users]);
  return (
    <div className="w-full items-center flex flex-col pt-8">
      <h1 className="text-5xl text-gray-500 pb-2 font-thin">Leaderboard</h1>
      <div className="w-1/2">
        {sortedUsers.map((user) => (
          <div className="border w-full rounded-lg text-gray-500  items-center border-gray-500 py-4 px-8 my-4 flex">
            <img className="rounded-full h-16 w-16" src={user.avatarURL} />
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
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
