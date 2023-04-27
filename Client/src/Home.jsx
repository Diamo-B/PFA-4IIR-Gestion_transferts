import "./App.css";
import ChoixTraget from "./Components/Departure_Arrival/ChoixTraget";
import Logout from "./Components/other/Logout";
import Night_Day from "./Components/other/Night_Day";

const Home = () => {
  return (
    <div
      id="topLevel"
      className="bg-indigo-200 dark:bg-slate-700 flex flex-col min-h-screen "
    >
      <div className="h-10 flex justify-between">
        <Logout />
        <Night_Day />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <ChoixTraget />
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default Home;
