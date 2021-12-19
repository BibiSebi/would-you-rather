import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeaderCard from "../components/LeaderCard";
import Spinner from "../components/Spinner";

const LeaderBoard = () => {
  const [sortedUsers, setSortedUsers] = useState([]);
  const { users, loading } = useSelector((state) => ({
    users: state.users,
    loading: state.loading,
  }));

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
  return !loading ? (
    <div className="w-full items-center flex flex-col pt-8">
      <h1 className="text-5xl text-gray-500 pb-2 font-thin">Leaderboard</h1>
      <div className="w-1/2">
        {sortedUsers.map((user) => (
          <LeaderCard user={user} />
        ))}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default LeaderBoard;
