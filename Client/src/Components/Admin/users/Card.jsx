import { UilUsersAlt} from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Card = () => {
    let [clientNbr,setClientNbr] = useState(0)
    let [agentNbr,setAgentNbr] = useState(0);
    let [sAgentNbr,setSAgentNbr] = useState(0);
    let {usersData} = useSelector(state => state.userPanel);
    useEffect(() => {
        let client = 0;
        let agent = 0;
        let superAgent = 0;
        usersData.forEach(user => {
            if(user.client !== null)
                client++; 
            else if(user.agent.isSuperAdmin === false)
                agent++
            else if(user.agent.isSuperAdmin === true)
                superAgent++;
        });
        setClientNbr(client);
        setAgentNbr(agent);
        setSAgentNbr(superAgent);
    }, [usersData]);

    return (
        <div className="h-40 w-2/12 border text-gray-600 bg-white border-gray-200 rounded-lg shadow flex justify-center flex-col items-center gap-3">
            <UilUsersAlt className="w-12 h-12 text-gray-500"/>
            <div className="text-center">
                <p className="font-bold">Super Agents: {sAgentNbr-1}</p>
            </div>
            <div className="grid grid-cols-2 w-full">
                <div className="text-center">
                    <p className="font-bold">Clients: {clientNbr}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold">Agents: {agentNbr}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
