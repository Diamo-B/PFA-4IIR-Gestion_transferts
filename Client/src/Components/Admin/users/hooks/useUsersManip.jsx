import { useDispatch, useSelector } from "react-redux";
import { deleteManyUsers, deleteUser, resetSelectedUsers, updateUser } from "../../../../Redux/Admin/UsersPanel";
import { setToast } from "../../../../Redux/Gen/toast";

const useUsersManip = () => {

    const dispatch = useDispatch();
    const {selectedUsers} = useSelector((state) => state.userPanel)


    let remove = (generalCheckbox) => {
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
            dispatch(setToast({
                type: "Info",
                message: `${data.count} ${data.count>1?"Users were":"User was"} deleted successfully`,
                reload: false
            }))
            dispatch(deleteManyUsers(usersMails))
        }).catch(err=>{
            console.error(err);
        }).finally(()=>{
            generalCheckbox.current.checked = false;
            dispatch(resetSelectedUsers([]));
        })
    }
    
    let handleBanUser = (user) => {
        fetch("/api/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "jwt"
                )}`,
            },
            body: JSON.stringify({
                email: user.email,
                banned: !user.banned,
            }),
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error("User ban error");
            }
            const data = await res.json();
            dispatch(updateUser(data));
            dispatch(setToast({
                type: "Info",
                message: `User ${data.banned?"banned":"unbanned"} successfully`,
                reload: false
            }));
        });
    }

    let deleteSingleUser = (email) => {
        console.log(email);
        fetch("/api/user/remove",{
            method: "delete",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                email: email
            })
        }).then(async res => {
            let data = await res.json();
            console.log(data);
            dispatch(setToast({
                type: "Info",
                message:`The user ${data.firstName} ${data.lastName} was deleted successfully`,
                reload: false
            }));
            dispatch(deleteUser(email))
        }).catch(err=>{
            console.error(err);
            dispatch(setToast({
                type: "Error",
                message: 'An unknown error occured',
                reload: false
            }));
        })
    }

    return {remove, handleBanUser, deleteSingleUser}
}

export default useUsersManip;