import { UilUsersAlt} from "@iconscout/react-unicons";
import { useState, useEffect } from "react";

const Card = () => {
    let [clientNbr,setClientNbr] = useState(0)
    let [agentNbr,setAgentNbr] = useState(0);
    useEffect(()=>{
        fetch("/api/user/count/clients",{
            method: "get",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(async res=>{
            let data = await res.json();
            setClientNbr(data);
        }).catch(err=>{
            console.error(err);
        })

        fetch("/api/user/count/agents",{
            method: "get",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(async res=>{
            let data = await res.json();
            setAgentNbr(data);
        }).catch(err=>{
            console.error(err);
        })
    },[])
    return (
        <div className="h-40 w-2/12 border text-gray-600 bg-white border-gray-200 rounded-lg shadow flex justify-center flex-col items-center gap-3">
            <UilUsersAlt className="w-12 h-12 text-gray-500" />
            <div className="mx-auto grid grid-cols-2 w-3/4">
                <div className="text-center">
                    <p className="font-bold">Clients</p>
                    <p className="font-bold">{clientNbr}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold">Agents</p>
                    <p className="font-bold">{agentNbr}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
