import Card from "../Components/Admin/users/Card";
import CreateUpdateAgent from "../Components/Admin/users/CreateUpdatePanel";
import Toast from "../Components/Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useFetchFilter } from "../Components/Admin/users/hooks/useFetchFilter";
import TableFrame from "../Components/Admin/users/tableFrame";
import { disableToast } from "../Redux/Gen/toast";
import { doneLoading, isLoading } from "../Redux/Gen/Loading";

const Users = () => {
    let users = useSelector(state => state.userPanel.usersData);
    let {filteredUsersData} = useSelector(state => state.userPanel);
    const userCreationPanel = useSelector((state) => state.userPanel.showCreateUserPanel);
    const userUpdatePanel = useSelector((state) => state.userPanel.showUpdateUserPanel.value);
    const {fetchingType, usersData} = useSelector((state) => state.userPanel);
    const {toast} = useSelector((state) => state.toast);
    let {fetchUsers} = useFetchFilter(fetchingType);
    let dispatch = useDispatch();
    
    useEffect(() => {
        if (fetchingType) {
            dispatch(isLoading())
            fetchUsers();
            dispatch(doneLoading())
        }
    }, [fetchingType, usersData]);


    return (
        <>
            <div className="flex flex-col items-center w-full gap-3 ">
                <Card/>
                <div className=" flex flex-col items-center w-full">
                    {users && <TableFrame users={filteredUsersData.length === 0 ? users : filteredUsersData}/>}
                </div>
            </div>
            {(userCreationPanel || userUpdatePanel) && (
                <div className="h-full w-full z-10 absolute top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-70 ">
                    <CreateUpdateAgent opType={userCreationPanel?"create":"update"}/>
                </div>
            )}

            {
            toast.active &&
            <Toast
                Type={toast.type}
                Message={toast.message}
                reload={toast.reload}
                trigger={disableToast}
            />
            }

        </>
    );
};

export default Users;
