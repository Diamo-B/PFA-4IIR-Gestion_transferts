import TableCard from '../../../Components/Admin/locations/TableCard';
import { openWindow, setPaths } from "../../../Redux/locations"
import { useSelector, useDispatch } from 'react-redux';
import TransferCreationForm from './TransferCreationForm';
import { useEffect, useState } from 'react';

const TransferTable = () => {
    let dispatcher = useDispatch();
    let {triggerWindow,triggerType, paths} = useSelector(state => state.locationPanel)
    useEffect(()=>{
        fetch("/api/path/getAll",{
            method: "get",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(async(res)=>{
            let results = await res.json()
            dispatcher(setPaths(results));
        }).catch(err=>{
            console.log(err);
        })
        //TODO: trigger the fetch on create or update
    },[])

    let changeStatus = (id, newStatus) => {
        console.log(id);
        fetch("/api/path/update",{
            method:"put",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                id: id,
                newData:{
                    active: newStatus
                }
            })
        }).then(async(res)=>{
            let result = await res.json();
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
            <div className="w-full h-full mt-5 px-5">
                <div className="mb-5 text-center">
                    <button
                        className="btn px-5 hover:bg-emerald-500 hover:text-white"
                        onClick={() => {
                            dispatcher(openWindow());
                        }}
                    >
                        Create A New Transfer Path
                    </button>
                </div>
                <div className="w-full border-2 border-gray-700 rounded-xl ">
                    <table className="w-full">
                        <thead className="border-b-2 border-gray-700">
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Distance</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className='max-w-1/4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paths && 
                                paths.map((path) => (
                                    <tr key={path.id} className="text-center">
                                        <th className="">
                                            <input type="checkbox" />
                                        </th>
                                        <td className="">{path.departure.name}</td>
                                        <td className="">{path.arrival.name}</td>
                                        <td className="">{path.distance} KM</td>
                                        <td className="">{path.price} DH</td>
                                        <td className="">
                                            <div className="flex justify-center items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${path.active?"bg-emerald-500":"bg-red-500"} mr-2`}></div>
                                                {path.active? "Active" : "Inactive"}
                                            </div>
                                        </td>
                                        <td className='flex justify-center gap-3'>
                                            <button className={`font-bold ${path.active?"hover:text-slate-400":"hover:text-emerald-500"}`}
                                                onClick={()=>changeStatus(path.id,!path.active)}
                                            >
                                                {path.active? "Disable" : "Activate"}
                                            </button>
                                            <button className='font-bold hover:text-amber-500'>Update</button>
                                            <button className='font-bold hover:text-red-500'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {triggerWindow == true && triggerType === "Transfers" && (
                <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
                    <div className="w-full absolute z-10">
                        <TableCard title={"Create A New Transfer Path"}>
                            <TransferCreationForm />
                        </TableCard>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransferTable;