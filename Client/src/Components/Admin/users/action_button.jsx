import { UilAngleDown } from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show, setFetchingType, setUsersFetchingErrors, setToastType } from "../../../Redux/UsersPanel";

const ActionBtn = () => {
    let [toggle, setToggle] = useState(false);
    const selectedUsers = useSelector((state) => state.userPanel.selectedUsers);
    const dispatcher = useDispatch();

    let remove = () => {
        let usersMails = selectedUsers.map(user => user.email);
        fetch("/api/user/removeBatch",{
            method: "delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                emails: usersMails
            })
        }).then(async res => {
            let data = await res.json();
            dispatcher(setToastType("Info"));
            dispatcher(setUsersFetchingErrors(data+" Users "+data>1?"were":"was"+"deleted successfully"));
            location.reload();
        }).catch(err=>{
            console.error(err);
        })
    }
    
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
                    {
                        selectedUsers.length > 0 && 
                        <button className="py-2 px-4 font-bold rounded-b-lg bg-red-600 text-white hover:bg-red-500" onClick={remove}>
                            Delete Users
                        </button>
                    }
                </div>
            )}
        </div>
    );
};

export default ActionBtn;
