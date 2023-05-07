import { UilMapMarker, UilLocationArrow, UilArrowFromTop } from '@iconscout/react-unicons'
import {
    openWindow,
    closeWindow,
    setCreationType
} from "../Redux/locations"
import { useSelector, useDispatch } from 'react-redux';
import TableCard from '../Components/Admin/locations/TableCard';
import LocationsForm from '../Components/Admin/locations/LocationsForm';
import TranfersForm from '../Components/Admin/locations/TransfersForm';
const Locations = () => {
    let dispatcher = useDispatch();
    let {triggerWindow,Create} = useSelector(state => state.locationPanel)

    return ( 
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-5 w-full">
                <button className={`w-2/12 border  border-gray-200 rounded-full shadow flex justify-center flex-col items-center gap-3 bg-white text-gray-600`}>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-bold text-lg">Locations</h1>
                        <div className='flex justify-center items-center'>
                            <UilMapMarker />
                            <p className="font-bold">50</p>
                        </div>
                    </div>
                </button>
                <button className={`w-2/12 border border-gray-200 rounded-full shadow flex justify-center flex-col items-center gap-3 bg-white text-gray-600`}>
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <h1 className="font-bold text-lg">Paths</h1>
                            <div className='flex justify-center items-center'>
                                <UilLocationArrow />
                                <p className="font-bold">25</p>
                            </div>
                        </div>

                    </div>
                </button>
            </div>
            <div className="bg-white text-gray-700 rounded-lg h-full w-11/12 flex justify-center items-center gap-5 p-7">
                <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
                    <div className='w-full h-full mt-5 px-5'>
                        <div className='mb-5 text-center'>
                            <button className='btn px-5 hover:bg-emerald-500 hover:text-white'
                                onClick={()=>{dispatcher(setCreationType("Location")) && dispatcher(openWindow())}}
                            >
                                Create A New Location
                            </button>
                        </div>
                        <div className='w-full border-2 border-gray-700 rounded-xl max-h-[25rem] overflow-y-auto'>
                            <table className='w-full max-h-full'>
                                <thead className='border-b-2 border-gray-700'>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th>Name</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    <tr className='text-center'>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <td>
                                            Tour Hassan
                                        </td>
                                        <td>
                                            120657.22
                                        </td>
                                        <td>
                                            755872.22
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        triggerWindow == true && Create === "Location" &&
                        <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
                            <div className="w-full absolute z-10">
                                <TableCard title="Create A New Location">
                                    <LocationsForm />
                                </TableCard>
                            </div>
                        </div>
                    }
                </div>
                <div className="relative h-full w-full border-2 rounded-2xl shadow-xl">
                    <div className='w-full h-full mt-5 px-5'>
                        <div className='mb-5 text-center'>
                            <button className='btn px-5 hover:bg-emerald-500 hover:text-white'
                                onClick={()=>{dispatcher(setCreationType("Transfers")) && dispatcher(openWindow())}}
                            >
                                Create A New Transfer Path
                            </button>
                        </div>
                        <div className='w-full border-2 border-gray-700 rounded-xl '>
                            <table className='w-full'>
                                <thead className='border-b-2 border-gray-700'>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    <tr className='text-center'>
                                        <th className = "">
                                            <input type="checkbox" />
                                        </th>
                                        <td className = "">
                                            Tour Hassan, Rabat
                                        </td>
                                        <td className = "">
                                            Place Petri, Rabat
                                        </td>
                                        <td className="">
                                            <div className="flex justify-center items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                Inactive
                                            </div>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        triggerWindow == true && Create === "Transfers" &&
                        <div className="absolute inset-0 flex justify-center items-center rounded-2xl shadow-xl bg-gray-600 bg-opacity-70 ">
                            <div className="w-full absolute z-10">
                                <TableCard title={"Create A New Transfer Path"}>
                                    <TranfersForm />
                                </TableCard>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Locations;