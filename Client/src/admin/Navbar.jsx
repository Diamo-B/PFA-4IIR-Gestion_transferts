import {
  UilUser,
  UilAward,
  UilMap,
  UilCarSideview,
  UilCalendarAlt,
  UilFilePlus,
  UilBill,
  UilInbox,
  UilSetting,
} from "@iconscout/react-unicons";
import Logout from "../Components/Client/other/Logout";
import { Link } from "react-router-dom";

const Title = ({ title }) => {
  return (
    <h1 className="hidden text-white font-bold group-hover:block capitalize absolute border-2 border-white py-3 px-5 rounded-2xl bg-emerald-400 left-full animate-slide">
      {title}
    </h1>
  );
};

const Navbar = ({currentUser}) => { 
  return (
    <div className="flex z-50 flex-col gap-7 px-5 justify-center items-start bg-emerald-500 rounded-r-2xl relative">
      <Link to={'/admin/reservation'} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilInbox className="text-white w-8 h-8" />
        <Title title="Reservations" />
      </Link>
      {
        currentUser?.agent?.isSuperAdmin == true 
        &&
        <>
          <Link to={"/admin/user"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
            <UilUser className="text-white w-8 h-8" />
            <Title title="Users" />
          </Link>
          <Link to={"/admin/authorization"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
            <UilAward className="text-white w-8 h-8" />
            <Title title="Authorizations" />
          </Link>
        </>
      }
      <Link to={"/admin/location"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilMap className="text-white w-8 h-8" /> {/* Locations / targets */}
        <Title title="Locations" />
      </Link>
      <Link to={"/admin/transportation"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilCarSideview className="text-white w-8 h-8" /> {/* transportation */}
        <Title title="Transportation" />
      </Link>
      <Link to={"/admin/period"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilCalendarAlt className="text-white w-8 h-8" /> {/* periodes */}
        <Title title="Periods" />
      </Link>
      <Link to={"/admin/extra"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilFilePlus className="text-white w-8 h-8" /> {/* extras */}
        <Title title="Extras" />
      </Link>
      <Link to={"/admin/billing"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilBill className="text-white w-8 h-8" /> {/* billing */}
        <Title title="Billing" />
      </Link>
      <Link to={"/admin/settings"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilSetting className="text-white w-8 h-8" /> {/* settings */}
        <Title title="Settings" />
      </Link>
      <div className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <Logout classNames={["text-white", "w-8", "h-8"]} />
        <Title title="Logout" />
      </div>
    </div>
  );
};

export default Navbar;
