import { UilAngleDown } from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { show, setFetchingType, setUsersFetchingErrors, setToastType } from "../../../Redux/UsersPanel";

const ActionBtn = () => {
    let [toggle, setToggle] = useState(false);
    const dispatcher = useDispatch();

    let remove = () => {
        fetch("/api/user/remove",{
            method: "delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                email: "azerty@gmail.com"
            })
        }).then(async res => {
            let data = await res.json();
            console.log(data);
            if(data.code === "notFound")
            {
                dispatcher(setUsersFetchingErrors("The required user was not found"));
                dispatcher(setToastType("Error"));
            }
            else
            {
                dispatcher(setToastType("Info"));
                dispatcher(setUsersFetchingErrors("User was deleted successfully"));
                location.reload();
            }
        }).catch(err=>{
            console.log(err);
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
                    <button className="py-2 px-4 font-bold  bg-emerald-500 text-white hover:bg-emerald-400"
                        onClick={() => dispatcher(show())}
                    >
                        New User 
                    </button>
                    <button className="py-2 px-4 font-bold rounded-b-lg bg-red-600 text-white hover:bg-red-500" onClick={remove}>
                        Delete Users
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActionBtn;
