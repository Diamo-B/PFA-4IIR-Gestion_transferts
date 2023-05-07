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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setUser} from '../Redux/auth';

const Navbar = () => { 
  let dispatch = useDispatch();
  useEffect(()=>{
    fetch("/api/verifyJWT",{
      method: 'post',
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(async (res)=>{
      let data = await res.json();
      dispatch(setUser(data));
    }).catch(err=>{
      console.log(err);
    })
  })
  let currentUser = useSelector(state => state.authUser.value);
  return (
    <div className="flex z-50 flex-col gap-7 px-5 justify-center items-start bg-emerald-500 rounded-r-2xl">
      <Link to={'/admin/reservation'} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilInbox className="text-white w-8 h-8" />
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          Reservations
        </h1>
      </Link>
      {
        currentUser?.agent?.isSuperAdmin == true 
        &&
        <>
          <Link to={"/admin/user"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
            <UilUser className="text-white w-8 h-8" />
            <h1 className="hidden text-white font-bold group-hover:block capitalize">
              Users
            </h1>
          </Link>
          <Link to={"/admin/authorization"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
            <UilAward className="text-white w-8 h-8" />
            <h1 className="hidden text-white font-bold group-hover:block capitalize">
              authorizations
            </h1>
          </Link>
        </>
      }
      <Link to={"/admin/location"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilMap className="text-white w-8 h-8" /> {/* Locations / targets */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          Locations
        </h1>
      </Link>
      <Link to={"/admin/vehicule"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilCarSideview className="text-white w-8 h-8" /> {/* vehicules */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          vehicules
        </h1>
      </Link>
      <Link to={"/admin/period"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilCalendarAlt className="text-white w-8 h-8" /> {/* periodes */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          periods
        </h1>
      </Link>
      <Link to={"/admin/extra"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilFilePlus className="text-white w-8 h-8" /> {/* extras */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          extras
        </h1>
      </Link>
      <Link to={"/admin/billing"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilBill className="text-white w-8 h-8" /> {/* billing */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          billing
        </h1>
      </Link>
      <Link to={"/admin/settings"} className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <UilSetting className="text-white w-8 h-8" /> {/* settings */}
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          settings
        </h1>
      </Link>
      <div className="flex justify-center items-center gap-2 group hover:cursor-pointer">
        <Logout classNames={["text-white", "w-8", "h-8"]} />
        <h1 className="hidden text-white font-bold group-hover:block capitalize">
          Log Out
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
