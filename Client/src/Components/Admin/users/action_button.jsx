import { UilMinus, UilPlus, UilFilter } from "@iconscout/react-unicons";
import { setFetchingType, show } from "../../../Redux/Admin/UsersPanel";
import { useDispatch, useSelector } from "react-redux";
import useUsersManip from "./hooks/useUsersManip";
import { useState } from "react";

const ActionBtn = ({generalCheckbox}) => {
    const dispatcher = useDispatch();
    const { selectedUsers } = useSelector((state) => state.userPanel);
    let {remove} = useUsersManip();
    let [toggle, setToggle] = useState(false);
    return (
        <div className="flex gap-5 items-center">
            <button className="h-fit border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-emerald-500 group"
                onClick={() => dispatcher(show())}
            >
                <UilPlus className="text-gray-700 group-hover:text-white "/>
            </button>

            {
                selectedUsers.length >= 2 && 
                <button className=" h-fit border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-red-500 group"
                    onClick={()=>remove(generalCheckbox)}
                >
                    <UilMinus className="text-gray-700 group-hover:text-white "/>
                </button>
            }

            <div className="flex items-center relative">
                <button className={`h-fit border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:bg-amber-300 ${toggle && "border-r-0 rounded-r-none"}`}
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <UilFilter className="text-gray-700 group-hover:text-black "/>
                </button>

                {
                    toggle &&   
                    <div className="w-50 text-black flex items-center -ml-2">
                        <button className=" bg-white px-5 py-1 border-2 rounded-l-full border-black hover:bg-amber-300"
                            onClick={()=>dispatcher(setFetchingType("clients")) && setToggle(false)}
                        >Clients only</button>
                        <button className="px-5 py-1 border-y-2 border-black hover:bg-amber-300"
                            onClick={()=>dispatcher(setFetchingType("agents")) && setToggle(false)}
                        >Agents only</button>
                        <button className="px-5 py-1 border-2 rounded-r-full border-black hover:bg-amber-300"
                            onClick={()=>dispatcher(setFetchingType("super")) && setToggle(false)}
                        >Super Agents only</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ActionBtn;
