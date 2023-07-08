import { useRef } from "react";
import Search from "./Search";
import ActionBtn from "./action_button";
import Table from "./table";


const TableFrame = ({users}) => {
    const generalCheckbox = useRef(null);
   
    return ( 
        <div className="w-11/12">
            <div className="flex items-center justify-between py-4 px-5 rounded-t-lg bg-white dark:bg-gray-800">
                <div className="flex items-center gap-5">
                    <ActionBtn generalCheckbox={generalCheckbox}/>
                </div>
                <Search />
            </div>
            <div className="max-h-[22rem] overflow-y-auto rounded-b-lg">
                <Table users={users} generalCheckbox={generalCheckbox}/>
            </div>
        </div>
    );
}
 
export default TableFrame;