import { useSelector, useDispatch } from "react-redux";
import {
    setAuthorizations,
    setIsLoading,
    setAgents,
    setSelectedAuthorization,
    activateModifyMode,
    disableModifyMode,
} from "../Redux/Authorizations";
import { setUser } from "../Redux/auth";
import { useEffect, useRef, useState } from "react";
import Button from "../Components/Admin/Authorizations/Button";

const Authorizations = () => {
    const dispatch = useDispatch();
    const authoSelect = useRef();
    const {
        Authorizations,
        Agents,
        isLoading,
        selectedAuthorization,
        modifyMode,
        modification
    } = useSelector((state) => state.authorizationPanel);
    const currentUser = useSelector((state) => state.authUser.value);

    let [unfiltredAgents, setUnfiltredAgents] = useState([]);
    let [filteredAgents, setFilteredAgents] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("jwt");
        fetch("/api/category/getAll", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                let data = await res.json();
                dispatch(setAuthorizations(data));
                dispatch(setIsLoading(false));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("jwt");
        fetch("/api/verifyJWT", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(async (res) => {
            let data = await res.json();
            dispatch(setUser(data.email));
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("jwt");
        fetch("/api/agent/permissions/getAll", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                let data = await res.json();
                setUnfiltredAgents(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setFilteredAgents(
            unfiltredAgents.filter((ag) => ag.user.email !== currentUser && ag.isSuperAdmin == false )
        );
    }, [unfiltredAgents]);

    useEffect(() => {
        dispatch(setAgents(filteredAgents));
    }, [filteredAgents, dispatch, Agents]);

    let selectAuthorization = () => {
        let value =
            authoSelect.current.value !== "Categories"
                ? authoSelect.current.value
                : null;
        dispatch(setSelectedAuthorization(value));
    };

    let saveOrModify = () => {
        if(selectedAuthorization!== null)
        {
            if(modifyMode == null)
                dispatch(activateModifyMode())
            else if(modifyMode == false)
                dispatch(activateModifyMode())
            else
            {
                dispatch(disableModifyMode());
                let token = localStorage.getItem("jwt");                
                modification.forEach(mod => {   
                    fetch('/api/permission/link',{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body:JSON.stringify({
                            email: mod.email,
                            category: mod.category[0].value,
                            permissions: mod.category[0].permissions
                        })
                    }).then(async(res)=>{
                        let data = await res.json();
                        location.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                });
            }                
        }
    }
    return (
        <>
            {!isLoading && Authorizations.length > 0 && (
                <div className="w-full pt-[10%] flex flex-col justify-center items-center gap-10">
                    <div className="max-h-[25rem] rounded-lg w-11/12 flex justify-center overflow-y-auto">
                        <table className="w-full bg-white text-gray-700 ">
                            <thead className=" text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="flex items-center justify-center px-6 py-4 "
                                    >
                                        <p className="text-center">Agents</p>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                        colSpan={4}
                                    >
                                        <select
                                            className=" p-2 text-sm text-center text-gray-900 border rounded-lg bg-gray-50 focus:outline-1 focus:outline-slate-400"
                                            onChange={selectAuthorization}
                                            ref={authoSelect}
                                            disabled={modifyMode}
                                        >
                                            <option
                                                defaultChecked
                                                hidden
                                                value="Categories"
                                            >
                                                Categories
                                            </option>
                                            {Authorizations.map((auth) => (
                                                <option
                                                    key={auth.id}
                                                    value={auth.name}
                                                >
                                                    {auth.name}
                                                </option>
                                            ))}
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Agents.length > 0 &&
                                    Agents.map((agent) => (
                                        <tr
                                            className="bg-white hover:bg-gray-50"
                                            key={agent.userId}
                                        >
                                            <th
                                                scope="row"
                                                className="flex items-center justify-center px-6 py-4 font-medium text-gray-900"
                                            >
                                                <div className="pl-3">
                                                    <p className="text-base font-semibold text-center">
                                                        {agent.user.firstName}{" "}
                                                        {agent.user.lastName}
                                                    </p>
                                                    <p className="font-normal text-gray-500 text-center">
                                                        {agent.user.email}
                                                    </p>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4 text-center">
                                                <Button
                                                    text="Read"
                                                    agent={agent}
                                                    op="read"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Button
                                                    text="Write"
                                                    agent={agent}
                                                    op="create"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Button
                                                    text="Update"
                                                    agent={agent}
                                                    op="update"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Button
                                                    text="Delete"
                                                    agent={agent}
                                                    op="delete"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="submit"
                        className={`px-10 py-1 border-2 border-slate-800 rounded-full font-bold text-slate-800 hover:text-white hover:border-white ${
                            modifyMode
                                ? "hover:bg-emerald-500"
                                : "hover:bg-indigo-300"
                        }`}
                        onClick={saveOrModify}
                        disabled={selectedAuthorization?false:true}
                    >
                        {modifyMode ? "Save" : "Modify"}
                    </button>
                </div>
            )}
        </>
    );
};

export default Authorizations;
