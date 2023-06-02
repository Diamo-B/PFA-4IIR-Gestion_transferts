import Models from "../Components/Admin/vehicules/Models/Models";
import Table from "../Components/Admin/vehicules/Table";

const Vehicules = () => {
    return ( 
        <div className="h-full w-full grid grid-cols-4 gap-5 p-5">
            <Models/>
            <Table/>
        </div>
    );
}
 
export default Vehicules;