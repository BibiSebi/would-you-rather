import { LogoutIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../App";

interface IHeaderComponent {
  name: string;
}

const Header = ({ name }: IHeaderComponent) => {
  const { authedUser, clearValues } = useContext(LocalStorageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearValues();
    navigate("/log-in");
  };
  return (
    <div className="flex justify-between w-full px-8 py-2 sticky t-0 border-b-2 bg-white z-1 items-centerr">
      <nav className="flex">
        <Link className=" px-4 py-2 text-gray-500 hover:bg-red-50" to="/">
          Home
        </Link>
        <Link className=" px-4 py-2 text-gray-500 hover:bg-red-50" to="/add">
          Create
        </Link>
        <Link
          className=" px-4 py-2  text-gray-500 hover:bg-red-50"
          to="/leaderboard"
        >
          Leaderboard
        </Link>
      </nav>

      <div className="flex ">
        <span className="px-4 py-2 text-gray-500">Hello {authedUser}</span>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className=" px-2 hover:bg-red-50"
        >
          <LogoutIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Header;
