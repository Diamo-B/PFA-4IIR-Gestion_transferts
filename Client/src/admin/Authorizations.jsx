import { useSelector, useDispatch } from "react-redux";
import useAuthorizationsManipulations from "../Components/Admin/Authorizations/useAuthorizationsManipulations";

import Select from "react-select";

import {
    triggerModifyMode,
    setIsLoading,
    setSelectedCat,
    setAgentsXCatsXPerms,
    addPermissionToAgent,
    removePermissionFromAgent,
    setSelectedPermissions,
    disableModifyMode,
} from "../Redux/Admin/Authorizations";

import { useEffect } from "react";
import { setToast, disableToast } from "../Redux/Gen/toast";
import Toast from "../Components/Toast/Toast";
import { doneLoading, isLoading } from "../Redux/Gen/Loading";
import LoadingPanel from "../Components/LoadingPanel/LoadingPanel";

const Authorizations = () => {
    const dispatch = useDispatch();

    const {
        modifyMode,
        Agents,
        options,
        selectedCat,
        AgentsXCatsXPerms,
        SelectedPermissions,
    } = useSelector((state) => state.authorizationPanel);

    const { toast } = useSelector(state => state.toast);
    const { loading, unmount } = useSelector((state) => state.loading);
    const {getAllCategories, getAllAgents, getCategoryPermissions} = useAuthorizationsManipulations();

    useEffect(() => {
        dispatch(isLoading())
        //DONE: Getting all categories and save them into the state
        getAllCategories()

        //DONE: Getting all agents except the superAgents and save them into the state
        getAllAgents()
        dispatch(doneLoading())
    }, []);

    useEffect(() => {
        //DONE: Getting all permissions for each registred agent for the selected category
        if (selectedCat !== null) {
            dispatch(setIsLoading(true));
            getCategoryPermissions(selectedCat)
            dispatch(setIsLoading(false));
        }
        else
        {
            dispatch(disableModifyMode())
        }
    }, [selectedCat]);

    let agentHasPermissionForCat = (agentId, permission) => {
        if (!selectedCat) {
            return false;
        }
        return AgentsXCatsXPerms.some((item) =>
            item.agentId === agentId &&
            item.permissions.some((obj) =>
                obj.value.toLowerCase() === permission.toLowerCase()
            )
        );
    };


    let handleColors_and_newPermissions = (event, op, agentId) => {
        //DONE: Colors
        let color;
        switch (op) {
            case "read":
                color = "text-emerald-500";
                break;
            case "write":
                color = "text-amber-500";
                break;
            case "update":
                color = "text-cyan-500";
                break;
            case "delete":
                color = "text-red-500";
                break;
        }
        event.target.classList.toggle(color) 
        if(!SelectedPermissions.filter(item=> item.agentId == agentId)[0].permissions.includes(op))
        {
            dispatch(addPermissionToAgent({agentId:agentId, newPermission: op}))
        }
        else {
            dispatch(removePermissionFromAgent({agentId: agentId, permissionToRemove: op}))
        }
    };


    let saveNewPermissions = () => {
        //? Original data
        let arr1 = AgentsXCatsXPerms.map((item) => {return{agentId: item.agentId, permissions: item.permissions.map(obj=> obj.value)}});
        
        //? The SelectedPermissions array holds the modifications

        //? The merged array specifies for each agent the permissions to add/remove
        const mergedArray = arr1.map((item1) => {
            const item2 = SelectedPermissions.find((item2) => item2.agentId === item1.agentId);
            if (item2) {
              const oldPermissions = item1.permissions.filter(
                (permission) => !item2.permissions.includes(permission)
              );
              const newPermissions = item2.permissions.filter(
                (permission) => !item1.permissions.includes(permission)
              );
          
              return {
                agentId: item1.agentId,
                permissions: {
                  Remove: oldPermissions,
                  New: newPermissions,
                },
              };
            } else {
              return item1;
            }
        });
        let filteredArray = mergedArray.filter((item)=>
            item.permissions.Remove.length > 0 || item.permissions.New.length > 0
        );        
        fetch("/api/authorisation/updatePermissions",{
            method:"put",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                data: filteredArray,
                catName: selectedCat
            })
        }).then(async(res)=>{
            let result = await res.json();
            dispatch(
                setToast({
                  type: "Success",
                  message: result.msg,
                  reload: false,
                })
            )
        }).catch(async (err)=>{
            let error = await err.json();
            dispatch(
                setToast({
                    type: "Error",
                    message:error.err,
                    reload: false,
                })
            )
        })
    };

    return (
        <>
            { loading || !unmount && <LoadingPanel />}
            {!loading && options.length > 0 && (
                <div className="w-full pt-[10%] flex flex-col justify-center items-center">
                    <div className="w-11/12 py-5 flex justify-center bg-white text-gray-700 text-base rounded-t-lg uppercase ">
                        <Select
                            placeholder="Choose a Category"
                            className="text-center font-bold w-1/4"
                            styles={{
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    boxShadow: "none",
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    outline: "none",
                                    border: "2px solid black",
                                    borderRadius: 10 + "px",
                                    boxShadow: state.isFocused
                                        ? "none"
                                        : "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                    },
                                }),
                            }}
                            isSearchable={true}
                            isClearable={true}
                            options={options}
                            onChange={(opt) => {
                                dispatch(setSelectedCat(null));
                                opt?.value && dispatch(setSelectedCat(opt.value));
                                
                            }}
                        />
                    </div>
                    {!loading && Agents.length > 0 && (
                        <>
                            <div className="rounded-b-lg w-11/12 flex justify-center max-h-[25rem] overflow-y-auto">
                                <table className="w-full bg-white text-gray-700">
                                    <tbody className="max-h-[25em] overflow-y-auto ta">
                                        {Agents.map((agent) => (
                                            <tr
                                                className="bg-white hover:bg-gray-200"
                                                key={agent.userId}
                                            >
                                                <th
                                                    scope="row"
                                                    className="flex items-center justify-center px-6 py-4 font-medium text-gray-900"
                                                >
                                                    <div className="pl-3">
                                                        <p className="text-base font-semibold text-center">
                                                            {agent.user
                                                                .lastName +
                                                                " " +
                                                                agent.user
                                                                    .firstName}
                                                        </p>
                                                        <p className="font-normal text-gray-500 text-center">
                                                            {agent.user.email}
                                                        </p>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        className={`font-bold ${
                                                            agentHasPermissionForCat(
                                                                agent.userId,
                                                                "read"
                                                            ) &&
                                                            "text-emerald-500"
                                                        } ${
                                                            !selectedCat &&
                                                            "text-gray-900"
                                                        }`}
                                                        onClick={(event) =>
                                                            modifyMode &&
                                                            handleColors_and_newPermissions(
                                                                event,
                                                                "read",
                                                                agent.userId
                                                            )
                                                        }
                                                    >
                                                        Read
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        className={`font-bold ${
                                                            agentHasPermissionForCat(
                                                                agent.userId,
                                                                "write"
                                                            ) &&
                                                            "text-amber-500"
                                                        } ${
                                                            !selectedCat &&
                                                            "text-gray-900"
                                                        }`}
                                                        onClick={(event) =>
                                                            modifyMode &&
                                                            handleColors_and_newPermissions(
                                                                event,
                                                                "write",
                                                                agent.userId
                                                            )
                                                        }
                                                    >
                                                        Write
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        className={`font-bold ${
                                                            agentHasPermissionForCat(
                                                                agent.userId,
                                                                "update"
                                                            ) && "text-cyan-500"
                                                        } ${
                                                            !selectedCat &&
                                                            "text-gray-900"
                                                        }`}
                                                        onClick={(event) =>
                                                            modifyMode &&
                                                            handleColors_and_newPermissions(
                                                                event,
                                                                "update",
                                                                agent.userId
                                                            )
                                                        }
                                                    >
                                                        Udpate
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        className={`font-bold ${
                                                            agentHasPermissionForCat(
                                                                agent.userId,
                                                                "delete"
                                                            ) && "text-red-500"
                                                        } ${
                                                            !selectedCat &&
                                                            "text-gray-900"
                                                        }`}
                                                        onClick={(event) =>
                                                            modifyMode &&
                                                            handleColors_and_newPermissions(
                                                                event,
                                                                "delete",
                                                                agent.userId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                type="submit"
                                className={`mt-5 px-10 py-1 border-2 border-slate-800 rounded-full font-bold text-slate-800 hover:text-white hover:border-white`}
                                onClick={() => {
                                    selectedCat &&
                                        dispatch(triggerModifyMode());
                                    !modifyMode === false &&
                                        saveNewPermissions();
                                }}
                            >
                                {modifyMode ? "Save" : "Modify"}
                            </button>
                        </>
                    )}
                    {
                    toast.active == true &&
                    <Toast Message={toast.message} Type={toast.type} trigger={disableToast} reload={toast.reload}/>
                    }
                </div>
            )}
        </>
    );
};

export default Authorizations;
