import { UilAsterisk } from '@iconscout/react-unicons';

import TableCard from "../../../Components/Admin/locations/TableCard";
import LocationsForm from "./LocationsForm";

import {
    openWindow,
    setLocations,
    resetSelection,
    setLocationToUpdate,
    setWindowType,
    triggerRefetch,
    disableRefetch
} from "../../../Redux/locations";

import { openPanel, closePanel } from "../../../Redux/confirmationPanel";
import ConfirmOp from "../../ConfirmOperation/ConfirmOp";


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useLocationHelpers  from "./useLocationHelpers";
import { SetToast } from '../../../Redux/toast';

const LocationsTable = () => {
    let dispatcher = useDispatch();
    let { locations } = useSelector(
        (state) => state.mapPanel.locations
    );
    let { selected } = useSelector((state) => state.mapPanel.window);
    let {windowType, triggerWindow, triggerType, Refetch} = useSelector(state => state.mapPanel.window);
    
    const { selectOrDeselect, selectOrDeselectAll } = useLocationHelpers();

    const {confirmOp} = useSelector(state => state.confirmationPanel)

    useEffect(() => {
        fetch("/api/place/getAll", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
        .then(async (res) => {
            let locations = await res.json();
            dispatcher(setLocations(locations));
        })
        .catch((err) => {
            console.error(err);
        });
        //DONE: trigger the fetch on update or create
        dispatcher(disableRefetch())
    }, [Refetch]);

    let DeleteLocations = () => {
        fetch("/api/place/removeMany",{
            method:"delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({IDs: selected})
        }).then(async(res)=>{
            let result = await res.json();
            dispatcher(triggerRefetch());
            dispatcher(resetSelection());
            dispatcher(SetToast({type: "Success", message: `${result.count > 1? result.count+" places were":"1 place was"} deleted successfully!!`, reload: false}))
        }).catch(err=>{
            console.error(err);
        })
    }

    let DeleteSingleLocation = (id) => {
        fetch("/api/place/remove",{
            method:"delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({id: id})
        }).then(async(res)=>{
            let result = await res.json();
            dispatcher(triggerRefetch());
            dispatcher(closePanel());
            dispatcher(SetToast({type: "Success", message: "1 place was deleted successfully!!", reload: false}))
        }).catch(err=>{
            console.error(err);
        })
    }   

    return (
        <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
            <div className="w-full h-full mt-5 px-5">
                <div className="mb-5 text-center flex justify-center items-center gap-5">
                    <button
                        className="btn px-5 hover:bg-emerald-500 hover:text-white"
                        onClick={() => {
                            dispatcher(setWindowType("create"))
                            dispatcher(openWindow());
                        }}
                    >
                        Create A New Location
                    </button>
                    {
                        selected.length > 0
                        &&
                        <button className="btn px-5 hover:bg-red-500 hover:text-white"
                            onClick={DeleteLocations}
                        >
                            Delete selected Location(s)
                        </button>
                    }
                </div>
                <div className="w-full border-2 border-gray-700 rounded-xl max-h-[25rem] overflow-y-auto">
                    <table className="w-full max-h-full">
                        <thead className="border-b-2 border-gray-700">
                            <tr className="text-center">
                                <th>
                                    <input type="checkbox" 
                                        onChange={(e)=>selectOrDeselectAll(e.target.checked)}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.length > 0 ?
                                locations.map((location) => (
                                    <tr
                                        className="text-center hover:bg-slate-200"
                                        key={location.id}
                                    >
                                        <th>
                                            <input type="checkbox" 
                                                onChange={(e)=>selectOrDeselect(location.id,e.target.checked)}
                                                checked={selected.includes(location.id)?true:false}
                                            />
                                        </th>
                                        <td>{location.name}</td>
                                        <td>{location.latitude ?? "------"}</td>
                                        <td>
                                            {location.longitude ?? "------"}
                                        </td>
                                        <td className="flex justify-center gap-10 items-center">
                                            <button className="font-bold hover:text-amber-500 hover:cursor-pointer"
                                                onClick={()=>{
                                                    dispatcher(setWindowType("update"));
                                                    dispatcher(resetSelection());
                                                    dispatcher(setLocationToUpdate(location.id))
                                                    dispatcher(openWindow());
                                                }}
                                            >
                                                Update
                                            </button>
                                            <button className="font-bold hover:text-red-500 hover:cursor-pointer"
                                                onClick={()=>{
                                                    dispatcher(openPanel({
                                                        operation_type: "Delete Location",
                                                        Impact: "danger",
                                                        executeParams: location.id,
                                                    }))
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr className="text-center">
                                    <th className="">
                                        <input type="checkbox" />
                                    </th>
                                    <td className="">
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                    </td>
                                    <td className="">
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                    </td>
                                    <td className="">
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                    </td>
                                    <td className="">
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                        <UilAsterisk className="inline"/>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {triggerWindow == true && triggerType === "Location" && windowType === "create" && (
                <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
                    <div className="w-full absolute z-10">
                        <TableCard title="Create A New Location">
                            <LocationsForm windowType={windowType}/>
                        </TableCard>
                    </div>
                </div>
            )}
            {triggerWindow == true && triggerType === "Location" && windowType === "update" && (
                <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
                    <div className="w-full absolute z-10">
                        <TableCard title="Update Location">
                            <LocationsForm windowType={windowType}/>
                        </TableCard>
                    </div>
                </div>
            )}
            {
                confirmOp.value == true &&
                <ConfirmOp operation_type={confirmOp.operation_type} Impact={confirmOp.Impact} execute={DeleteSingleLocation}/>
            }
        </div>
    );
};

export default LocationsTable;
