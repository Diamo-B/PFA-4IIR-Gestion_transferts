import { useSelector, useDispatch } from "react-redux";
import {
    setAuthorizations,
    setIsLoading,
    setAgents,
    setSelectedAuthorization
} from "../Redux/Authorizations";
import { setUser } from "../Redux/auth";
import { useEffect, useRef, useState } from "react";

const Authorizations = () => {
    const dispatch = useDispatch();
    const authoSelect = useRef();
    const { Authorizations, Agents, isLoading, selectedAuthorization } = useSelector(
        (state) => state.authorizationPanel
    );
    const currentUser = useSelector((state) => state.authUser.value);

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
                fetch("/api/agent/permissions/getAll", {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(async (res) => {
                        let data = await res.json();
                        dispatch(setAgents(data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [filteredAgents, setFilteredAgents]=useState([]);
    useEffect(()=>{
        setFilteredAgents(Agents.filter((ag) => ag.user.email !== currentUser))
    },[Agents])

    let selectAuthorization = () => {
        let value = authoSelect.current.value !== "---" ? authoSelect.current.value : null
        dispatch(setSelectedAuthorization(value));
    }
    
    let renderColors = (agent,op) => {
        let color;
        switch(op)
        {
            case "read":
                color = 'text-green-500'
                break;
            case "create":
                color = 'text-amber-500'
                break;
            case "update":
                color = 'text-blue-500'
                break;
            case "delete":
                color = 'text-red-500'
                break;
            case "crud":
                color = 'text-violet-500'
                break;
        }
        if(agent.categories?.some(cat => (cat.category.name == selectedAuthorization) && (cat.permissions.some(permission => permission.value.toLowerCase() == op.toLowerCase()))))
            return color;
        else
            return 'text-gray-500';
    }
    

    return (
        <>
            {!isLoading && Authorizations.length > 0  && (
                <div className="w-full pt-[10%] flex flex-col justify-center items-center gap-10">
                    <div className="max-h-[25rem] w-full flex justify-center overflow-y-auto">
                        <table className="w-11/12 bg-white text-gray-700 ">
                            <thead className=" text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="flex items-center justify-center px-6 py-4 "
                                    >
                                        <p className="text-center">Agent</p>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                        colSpan={4}
                                    >
                                        <select className=" p-2 text-sm text-center text-gray-900 border rounded-lg bg-gray-50 focus:outline-1 focus:outline-slate-400"
                                            onChange={selectAuthorization}
                                            ref={authoSelect}
                                        >
                                            <option defaultChecked value="---">
                                                ---
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
                                {filteredAgents.length > 0 &&
                                    filteredAgents.map((agent) => (
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
                                                <button className={`font-bold ${renderColors(agent,"read")}`}>
                                                    Read
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className={`font-bold ${renderColors(agent,"create")}`}>
                                                    Write
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className={`font-bold ${renderColors(agent,"update")}`}>
                                                    Update
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className={`font-bold ${renderColors(agent,"delete")}`}>
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
                        className="px-10 py-1 border-2 border-slate-800 rounded-full font-bold text-slate-800 hover:border-white hover:bg-indigo-300 hover:text-white"
                    >
                        Save
                    </button>
                </div>
            )}
        </>
    );
};

export default Authorizations;
