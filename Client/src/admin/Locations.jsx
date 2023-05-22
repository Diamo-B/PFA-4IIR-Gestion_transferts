import { useSelector } from 'react-redux';
import Card from '../Components/Admin/locations/Card';
import LocationsTable from "../Components/Admin/locations/LocationsTable";
import TransferTable from "../Components/Admin/locations/TransferTable";
import Toast from "../Components/Toast/Toast"
import {disableToast} from "../Redux/locations"
import ConfirmOp from '../Components/ConfirmOperation/ConfirmOp';

const Locations = () => {
    const {triggerType, toast} = useSelector(state => state.locationPanel)
    return ( 
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <Card />
            <div className="bg-white text-gray-700 rounded-lg h-full w-11/12 flex justify-center items-center gap-5 p-7">
                {
                    (triggerType === null || triggerType === "Location") 
                    &&
                    <LocationsTable />
                }
                {
                    triggerType === "Transfers" 
                    &&
                    <TransferTable  />
                }
                {
                    toast.active == true &&
                    <Toast Message={toast.message} Type={toast.type} trigger={disableToast} reload={toast.reload}/>
                }
            </div>
        </div>
    );
}
 
export default Locations;