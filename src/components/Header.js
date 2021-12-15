import { Link, useNavigate } from "react-router-dom";

const Header = ({ name }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/log-in");
  };
  return (
    <div className="flex justify-between w-full px-8 py-2 sticky t-0 border-b-2 bg-white z-1 items-centerr">
      <nav className="flex">
        <Link className=" px-4 py-2 hover:bg-red-50" to="home">
          Home
        </Link>
        <Link className=" px-4 py-2 hover:bg-red-50" to="home">
          Create
        </Link>
        <Link className=" px-4 py-2 hover:bg-red-50" to="home">
          Leaderboard
        </Link>
      </nav>

      <div>
        <span className=" px-4 py-2">
          Hello {JSON.parse(localStorage.getItem("authedUser"))}
        </span>
        <button onClick={handleLogout} className=" px-4 py-2 hover:bg-red-50">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
