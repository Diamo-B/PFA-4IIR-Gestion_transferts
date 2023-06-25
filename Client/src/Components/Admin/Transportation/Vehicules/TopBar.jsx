import Search from "../../users/Search";
import { UilPlus, UilMinus} from '@iconscout/react-unicons';
import {disableVehicleModifyMode, enableVehicleCreateMode} from  "../../../../Redux/Transportation.js";
import {SetToast} from "../../../../Redux/toast.js";
const TopBar = ({dispatch, selectedModel,selectedVehicles,deleteSelectedVehicles}) => {

    let enableCreateMode = () => {
        if(selectedModel)
        {
            dispatch(disableVehicleModifyMode())
            dispatch(enableVehicleCreateMode())
        }
        else
            dispatch(SetToast({
                type: "Info",
                message: "Please select a model before creating a new vehicle",
                reload: false
            }))
    }

    return ( 
        <div className="flex items-center justify-between py-4 px-5 rounded-lg bg-white dark:bg-gray-800 ">
            <div className="flex gap-5">
                <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-emerald-500 group"
                    onClick={enableCreateMode}
                >
                    <UilPlus className="text-gray-700 group-hover:text-white "/>
                </button>
                {
                    selectedVehicles.length > 0 &&
                    <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-red-500 group"       onClick={deleteSelectedVehicles}>
                        <UilMinus className="text-gray-700 group-hover:text-white "/>
                    </button>
                }
            </div>
            <Search />
        </div>
    );
}
 
export default TopBar;