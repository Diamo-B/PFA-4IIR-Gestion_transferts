import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../../Redux/Gen/toast";
import { setFilteredUsersData, setUsersData } from "../../../../Redux/Admin/UsersPanel";

export const useFetchFilter = (type) => {
    let url;
    let dispatch = useDispatch();
    let {usersData, filteredUsersData} = useSelector(state => state.userPanel);
   
    
    const fetchUsers = () => {
        // TODO: Show toasts if the shit is empty, make a separate array that stores the feched data once for all
        if(type == "all")
        {
            if(filteredUsersData.length === 0)
            {
                fetch("/api/user/getAll", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }).then(async(res)=>{
                    if(!res.ok)
                    {
                        throw new Error("Fetching error");
                    }
                    const data = await res.json();
                    if(data && data.length === 0) {
                        throw new Error("No users were found");
                    }
                    dispatch(setUsersData(data));
                }).catch(err=>{
                    console.error(err);
                    dispatch(setToast({
                        type: "Error",
                        message: err.message,
                        reload: false
                    }))
                });
            }
            else
            {
                dispatch(setFilteredUsersData(usersData));
            }
        }
        if(type =="clients")
        {
            return dispatch(setFilteredUsersData(usersData.filter(user=>user.client !== null)))
        }
        if(type =="agents")
        {
            return dispatch(setFilteredUsersData(usersData.filter(user=>user.agent !== null && user.agent.isSuperAdmin === false)))
        }
        if(type =="super")
        {
            return dispatch(setFilteredUsersData(usersData.filter(user=>user.agent !== null && user.agent.isSuperAdmin === true)));
        }
        else
        {
            if(type !== "all")
            {
                return dispatch(setFilteredUsersData(usersData.filter(user=> user.firstName.includes(type) || user.lastName.includes(type) || user.email.includes(type))));
            }
        }
    }
    return {fetchUsers}
};
