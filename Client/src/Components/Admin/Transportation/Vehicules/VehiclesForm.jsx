import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {SetToast} from "../../../../Redux/toast";
import {disableVehicleCreateMode} from "../../../../Redux/Transportation";


const VehiclesForm = ({register,errors,setValue}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const errorMessages = Object.values(errors)
          .map((error) => error.message)
          .filter(Boolean)
          .join('\n');
      
        if (errorMessages) {
          dispatch(
            SetToast({
              type: "Error",
              message: errorMessages,
              reload: false,
            })
          );
        }
    }, [errors]);
  
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
                       {...register("ModelCreate")}
                />
            </td>
            <td>
                <input type="text" className="py-1 text-center"
                        {...register("BrandCreate")}
                />
            </td>
            <td>
                <input type="number" min={0} className="py-1 text-center"
                       {...register("PlacesCreate")}
                />
            </td>
            <td className="px-6 py-4">
                <label className="relative top-1 inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer"
                        defaultValue={setValue('LuxuryCreate', false, { shouldDirty: true })}
                        onChange={(e) => setValue('LuxuryCreate', e.target.checked, { shouldDirty: true })}
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
                    <button type="submit" className="font-bold hover:text-emerald-500 cursor-pointer">
                        Create
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default VehiclesForm;