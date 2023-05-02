import Card from "../Components/Admin/users/Card";
import CreateAgent from "../Components/Admin/users/CreatePanel";
import Table from "../Components/Admin/users/table";
import Toast from "../Components/Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setUsersData, setUsersFetchingErrors, resetFetchingErrors } from "../Redux/UsersPanel";
import { useEffect } from "react";
import { useFetchFilter } from "../Components/Admin/users/hooks/useFetchFilter";

const Users = () => {
    let users = useSelector(state => state.userPanel.usersData);
    const userCreationPanel = useSelector(
        (state) => state.userPanel.showCreateUserPanel
    );
    const fetchingType = useSelector((state) => state.userPanel.fetchingType);
    const errors = useSelector((state) => state.userPanel.usersFetchingErrors);
    const dispatcher = useDispatch();
    const { data, error, isError, isLoading } = useFetchFilter(fetchingType);

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                dispatcher(setUsersData(data));
            }
            if (isError && error) {
                dispatcher(setUsersFetchingErrors(error.message));
            }
        }
    }, [data, isError, error]);
    return (
        <>
            <div className="flex flex-col items-center w-full gap-3 ">
                <Card />
                <div className=" flex flex-col items-center w-full">
                    {isLoading ? <p>Loading</p> : data || errors ? <Table error={error} users={users}/> : null}
                </div>
            </div>
            {userCreationPanel && (
                <div className="h-full w-full z-10 absolute top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-70 ">
                    <CreateAgent />
                </div>
            )}

            {errors &&
                errors.map((err, index) => (
                    <Toast
                        key={index}
                        Type="Error"
                        Message={err}
                        trigger={resetFetchingErrors}
                    />
                ))
            }
        </>
    );
};

export default Users;