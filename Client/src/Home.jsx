import "./index.css";
import ChoixTraget from "./Components/Departure_Arrival/ChoixTraget";
import Toast from "./Components/Toast/Toast";
import Logout from "./Components/other/Logout";
import Night_Day from "./Components/other/Night_Day";
import { useSelector } from "react-redux";
import { resetImproperDate } from "./Redux/dates";
import { useState } from "react";

const Home = () => {
  let datesError = useSelector(state=>state.travelDates.itinerary.improperDates.value);
  let [logout, shouldLogout] = useState(false);
  return (
    <div
      id="topLevel"
      className="bg-indigo-200 dark:bg-gray-900 flex flex-col min-h-screen "
    >
      <div className="h-10 flex justify-between">
        <Logout classNames={["text-slate-600"]} />
        <Night_Day />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <ChoixTraget />
        {datesError && <Toast trigger={resetImproperDate} Type="Error" Message="Please ensure that the departure date is before the arrival date"/>}
      </div>

      <div className="h-10">

      </div>
    </div>
  );
};

export default Home;
