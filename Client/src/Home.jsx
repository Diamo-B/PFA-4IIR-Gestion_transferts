import Reservation from "./Components/Client/Departure_Arrival/Reservation";
import Toast from "./Components/Toast/Toast";
import Logout from "./Components/Client/other/Logout";
import Night_Day from "./Components/Client/other/Night_Day";
import { useSelector } from "react-redux";
import { disableToast } from "./Redux/Gen/toast";

const Home = () => {
  let {toast} = useSelector((state) => state.toast);
  return (
    <div
      id="topLevel"
      className="bg-indigo-200 dark:bg-gray-700 flex flex-col min-h-screen "
    >
      <div className="h-10 flex justify-between">
         <Logout classNames={["text-slate-600 dark:text-white"]} />
         <Night_Day /> 
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <Reservation />
        {toast.active == true && (
          <Toast
            Type={toast.type}
            Message={toast.message}
            trigger={disableToast}
            reload={toast.reload}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
