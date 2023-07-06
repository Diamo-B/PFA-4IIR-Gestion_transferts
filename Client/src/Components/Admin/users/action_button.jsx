import { UilAngleDown } from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show, setFetchingType, setUsersFetchingErrors, setToastType, deleteManyUsers } from "../../../Redux/Admin/UsersPanel";

const ActionBtn = () => {
    let [toggle, setToggle] = useState(false);
    const selectedUsers = useSelector((state) => state.userPanel.selectedUsers);
    const dispatcher = useDispatch();
    
    return (
        <div>
            <button
                className="inline-flex mb-3 items-center text-gray-500 bg-white border border-gray-300 font-medium rounded-lg text-sm px-3 py-1.5"
                type="button"
                onClick={() => {
                    setToggle((prev) => !prev);
                }}
            >
                Options
                <UilAngleDown />
            </button>
            {/* Dropdown menu */}
            {toggle && (
                <div className="absolute bg-white rounded-lg shadow w-44 flex flex-col"
                    onMouseLeave={()=>{setToggle(false)}}
                >
                    <button className="py-2 px-4 rounded-t-lg text-black hover:bg-gray-200"
                        onClick={()=>dispatcher(setFetchingType("clients"))}
                    >
                        Clients Only
                    </button>
                    <button className="py-2 px-4 text-black hover:bg-gray-200"
                        onClick={()=>dispatcher(setFetchingType("agents"))}
                    >
                        Agents Only
                    </button>
                    <button className={`py-2 px-4 font-bold bg-emerald-500 text-white hover:bg-emerald-400 ${selectedUsers.length == 0 && "rounded-b-lg"}`}
                        onClick={() => dispatcher(show())}
                    >
                        New Agent 
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActionBtn;
