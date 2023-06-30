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
    disableRefetch,
    deleteLocation,
    deleteLocations
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
    
    const { selectOrDeselect, selectOrDeselectAllLocations } = useLocationHelpers();

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
            if(!locations.err)
                dispatcher(setLocations(locations));
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

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
            dispatcher(deleteLocations(selected))
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
            dispatcher(deleteLocation(result.id))
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
                <div className="w-full border-2 border-gray-700 rounded-md max-h-[25rem] overflow-y-auto">
                    <table className="w-full max-h-full text-sm text-center text-gray-700">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="w-4 pl-6">
                                    <input type="checkbox" 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        onChange={(e)=>selectOrDeselectAllLocations(e.target.checked)}
                                    />
                                </th>
                                <th scope="col" className="p-5">Name</th>
                                <th scope="col" className="p-5">Latitude</th>
                                <th scope="col" className="p-5">Longitude</th>
                                <th scope="col" className="p-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.length > 0 ?
                                locations.map((location) => (
                                    <tr
                                        className="bg-white hover:bg-gray-100"
                                        key={location.id}
                                    >
                                        <td className="w-4 pl-6">
                                            <input type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                onChange={(e)=>selectOrDeselect(location.id,e.target.checked)}
                                                checked={selected.includes(location.id)?true:false}
                                            />
                                        </td>
                                        <th className="p-5">{location.name}</th>
                                        <td className={`p-5 ${location.latitude ?? 'text-bold text-xl'}`}>{location.latitude ?? "--------------"}</td>
                                        <td className={`p-5 ${location.latitude ?? 'text-bold text-xl'}`}>
                                            {location.longitude ?? "--------------" }
                                        </td>
                                        <td>
                                            <button className="font-bold hover:text-amber-500 hover:cursor-pointer mr-2"
                                                onClick={()=>{
                                                    dispatcher(setWindowType("update"));
                                                    dispatcher(resetSelection());
                                                    dispatcher(setLocationToUpdate(location.id))
                                                    dispatcher(openWindow());
                                                }}
                                            >
                                                Update
                                            </button>
                                            <button className="font-bold hover:text-red-500 hover:cursor-pointer ml-2"
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
                                <tr className="text-gray-900 capitalize font-medium bg-white hover:bg-gray-50">
                                    <td colSpan="7" className="py-8 text-center">
                                        <p>No Locations were found</p>
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
