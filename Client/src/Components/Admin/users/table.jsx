import ActionBtn from "../users/action_button";
import Search from "../users/Search";
import {useSelector} from 'react-redux';

const Table = ({error, users}) => {
    
    const filteredUsers = users.map((obj) => {
        return obj.hasOwnProperty("userId") ? obj.user : obj;
    });
      
    const fetchingType = useSelector((state) => state.userPanel.fetchingType);
    let type;
    switch(fetchingType)
    {
        case 'clients':
            type = "Client"
            break;
        case 'agents':
            type="Agent"
            break;
    }
    console.log(error);
    return (
        <div className="w-11/12">
            <div className="flex items-center justify-between py-4 px-5 rounded-t-lg bg-white dark:bg-gray-800 ">
                <ActionBtn />
                <Search />
            </div>
            <div className="max-h-[22rem] overflow-y-auto rounded-b-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        disabled={users.length === 0 ? true : false}
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
                            filteredUsers && !error && 
                            filteredUsers.map((user)=>(
                                <tr className="bg-white hover:bg-gray-50" key={user.id}>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
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
                                        {user.agent && "agent"}
                                        {user.client && "client"}
                                        {type && type}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                            Offline
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href="#"
                                            type="button"
                                            data-modal-show="editUserModal"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit user
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }    
                        {
                            (filteredUsers.length === 0 || error )&&
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
            </div>
        </div>
    );
};

export default Table;
