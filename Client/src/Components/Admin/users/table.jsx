import {useSelector, useDispatch} from 'react-redux';
import {showUpdate ,setSelectedUsers, removeUserFromSelection, resetSelectedUsers, updateUser, deleteUser} from '../../../Redux/Admin/UsersPanel'
import { useEffect, useState } from 'react';
import LoadingPanel from '../../LoadingPanel/LoadingPanel';
import useUsersManip from './hooks/useUsersManip';

const Table = ({users, generalCheckbox}) => {
    const filteredUsers = users.map((obj) => {
        return obj.hasOwnProperty("userId") ? obj.user : obj;
    });
    const currentUser = useSelector(state  => state.authUser.value);
    const [currentUserEmail,setCurrentUserEmail] = useState(null);
    const filteredUsers_Email =  filteredUsers.filter(item => item.email !== currentUserEmail)

    const selectedUsers = useSelector((state) => state.userPanel.selectedUsers);
    const dispatcher = useDispatch();
    const { loading, unmount } = useSelector((state) => state.loading);

    const [selectedUsersSet, setSelectedUsersSet] = useState(new Set(selectedUsers.map(user=>user.id)));

    useEffect(() => {
        currentUser !== null &&
        setCurrentUserEmail(currentUser.email);
        setSelectedUsersSet(new Set(selectedUsers.map(user=>user.id)));
    }, [selectedUsers,currentUser]);

    let AddItemToSelection = (user) => {
        if (!selectedUsersSet.has(user.id)) {
            dispatcher(setSelectedUsers(user))
        }
        else
        {
            dispatcher(removeUserFromSelection(user))
        }
    }   
    
    let selectAllUsers = (e) => {
        dispatcher(resetSelectedUsers());
        if(e.target.checked)
        {
            filteredUsers_Email.map((user)=>{
                dispatcher(setSelectedUsers(user));
            })
        }
    }

   let {handleBanUser, deleteSingleUser} = useUsersManip();

   

    function identifyUserType(user) {
        if(user.client !== null)
            return "Client" 
        else if(user.agent.isSuperAdmin === false)
            return "Agent"
        else
            return "Super Agent"
    }

    return (
        <>
        { 
            loading || !unmount ? <LoadingPanel />
            :
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                    disabled={(filteredUsers_Email.length === 0) ? true : false}
                                    onChange={selectAllUsers}
                                    ref={generalCheckbox}
                                />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers_Email &&
                        filteredUsers_Email.map((user)=>(
                            <tr className="bg-white hover:bg-gray-50" key={user.id}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            onChange={()=>{AddItemToSelection(user)}}
                                            checked={
                                                selectedUsersSet.has(user.id)
                                            }
                                        />
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                {
                                    identifyUserType(user)
                                }
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${user.banned?"bg-red-500":"bg-emerald-500"}`}></div>
                                        {user.banned ? "Banned" : "Authorized"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className='w-full flex gap-5'>
                                        <span
                                            href="#"
                                            type="button"
                                            data-modal-show="editUserModal"
                                            className={`font-bold hover:cursor-pointer ${user.banned? "hover:text-emerald-500" : "hover:text-red-500"}`}
                                            onClick={()=>{
                                                handleBanUser(user)
                                            }}
                                        >
                                        {user.banned ? "Unban User" : "Ban User"}
                                        </span>

                                        <span
                                            href="#"
                                            type="button"
                                            data-modal-show="editUserModal"
                                            className={`font-bold hover:cursor-pointer hover:text-amber-500`}
                                            onClick={()=>{
                                                dispatcher(showUpdate(user))
                                            }}
                                        >
                                            Edit User
                                        </span>

                                        <span
                                            href="#"
                                            type="button"
                                            data-modal-show="editUserModal"
                                            className={`font-bold hover:cursor-pointer hover:text-red-500`}
                                            onClick={()=>{
                                                deleteSingleUser(user.email)
                                            }}
                                        >
                                            Delete User
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }    
                    {
                        (filteredUsers_Email.length === 0 )&&
                        <tr className="bg-white hover:bg-gray-50">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        disabled
                                    />
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4"
                            >
                                <p className="text-base font-bold">------</p>
                            </th>
                            <td className="px-6 py-4">
                                <p className="text-base font-bold">------</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-base font-bold">------</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-base font-bold">------</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        }
        </>
    );
};

export default Table;
