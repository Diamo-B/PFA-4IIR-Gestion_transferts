import { useRef } from "react";
import Search from "./Search";
import ActionBtn from "./action_button";
import Table from "./table";
import { useSelector, useDispatch } from "react-redux";
import { deleteManyUsers, setToastType, setUsersFetchingErrors } from "../../../Redux/Admin/UsersPanel";

const TableFrame = ({users, error}) => {
    const selectedUsers = useSelector((state) => state.userPanel.selectedUsers);
    const generalCheckbox = useRef(null);
    let dispatcher = useDispatch();
    let remove = () => {
        let usersMails = selectedUsers.map(user => user.email);
        fetch("/api/user/removeBatch",{
            method: "delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                emails: usersMails
            })
        }).then(async res => {
            let data = await res.json();
            dispatcher(setToastType("Info"));
            dispatcher(setUsersFetchingErrors(`${data.count} ${data.count>1?"Users were":"User was"} deleted successfully`));
            dispatcher(deleteManyUsers(usersMails))
        }).catch(err=>{
            console.error(err);
        })
        generalCheckbox.current.checked = false;
    }

    return ( 
        <div className="w-11/12">
            <div className="flex items-center justify-between py-4 px-5 rounded-t-lg bg-white dark:bg-gray-800">
                <div className="flex items-center gap-5">
                    <ActionBtn generalCheckbox={generalCheckbox} />
                    {
                        selectedUsers.length >= 2 && 
                        <button className="text-gray-500 bg-white border border-gray-300 font-medium rounded-lg text-sm px-3 py-2 mb-3 hover:bg-red-500 hover:text-white" onClick={remove}>
                            Delete Users
                        </button>
                    }
                </div>
                <Search />
            </div>
            <div className="max-h-[22rem] overflow-y-auto rounded-b-lg">
                <Table users={users} error={error}/>
            </div>
        </div>
    );
}
 
export default TableFrame;