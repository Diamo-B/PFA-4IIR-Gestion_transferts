import { useDispatch } from "react-redux";
import {disableVehicleCreateMode} from "../../../../Redux/Transportation.js";

const VehiclesForm = ({register}) => {
    
    const dispatch = useDispatch();
    return (
        <tr className="bg-white hover:bg-gray-50 font-medium text-gray-900 uppercase">
            <th className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        disabled={true}
                    />
                </div>
            </th>
            <td scope="row">
                <input type="text" autoFocus className="py-1 text-center"
                       {...register("Model")}
                />
            </td>
            <td>
                <input type="text" className="py-1 text-center"
                        {...register("Brand")}
                />
            </td>
            <td>
                <input type="number" min={0} className="py-1 text-center"
                       {...register("Places")}
                />
            </td>
            <td className="px-6 py-4">
                <label className="relative top-1 inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer"
                           {...register("Luxe")}
                    />
                    <div
                        className={`w-10 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500`}></div>
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                    <button
                        className="font-bold hover:text-red-500"
                        type="button"
                        onClick={()=> {
                            dispatch(disableVehicleCreateMode())
                        }}
                    >
                        Close
                    </button>
                    <input type="submit" value="Submit" className="font-bold hover:text-emerald-500"/>
                </div>
            </td>
        </tr>
    );
};

export default VehiclesForm;