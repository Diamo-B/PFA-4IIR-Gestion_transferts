import Models from "../Components/Admin/vehicules/Models/Models";
import Table from "../Components/Admin/vehicules/Table";
import { useSelector } from "react-redux";
import Toast from "../Components/Toast/Toast";
import { disableToast } from "../Redux/toast";

const Vehicules = () => {
    let {toast} = useSelector(state=>state.toast);
    return ( 
        <div className="h-full w-full grid grid-cols-4 gap-5 p-5">
            <Models/>
            <Table/>
            {
                toast.active == true &&
                <Toast Type={toast.type} Message={toast.message} trigger={disableToast} reload={toast.reload}/>
            }
        </div>
    );
}
 
export default Vehicules;