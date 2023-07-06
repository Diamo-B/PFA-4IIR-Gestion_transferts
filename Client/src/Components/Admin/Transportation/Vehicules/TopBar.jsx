import Search from "../../users/Search";
import { UilPlus, UilMinus} from '@iconscout/react-unicons';
import {disableVehicleModifyMode, enableVehicleCreateMode} from  "../../../../Redux/Admin/Transportation.js";
import {setToast} from "../../../../Redux/Gen/toast.js";
import {useSelector, useDispatch} from "react-redux";
import { openPanel } from "../../../../Redux/Gen/confirmationPanel";

const TopBar = ({resetFields,generalCheckbox,setDeleteLots}) => {
    let dispatch = useDispatch();
    let {selectedModel, selectedVehicles} = useSelector(
        (state) => state.transportation.vehicules
    );
    let enableCreateMode = () => {
        if(selectedModel)
        {
            dispatch(disableVehicleModifyMode())
            dispatch(enableVehicleCreateMode())
            resetFields();
        }
        else
            dispatch(setToast({
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
                    <button className="border-2 border-gray-700 text-gray-700 text-lg font-bold px-5 rounded-full hover:text-white hover:bg-red-500 group" onClick={()=>{
                        setDeleteLots(true);
                        dispatch(openPanel({
                            Impact: "danger",
                            executeParams: selectedVehicles,
                            operation_type: "Delete Selected Vehicles"                            
                        }))                        
                        generalCheckbox.current.checked = false;
                    }}>
                        <UilMinus className="text-gray-700 group-hover:text-white "/>
                    </button>
                }
            </div>
            <Search />
        </div>
    );
}
 
export default TopBar;