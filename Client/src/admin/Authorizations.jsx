import { useEffect, useState } from "react";
import TableFrame from "./tableFrame";
import {pushAuthorisation} from '../Redux/AuthorizationsPanel';
import { useDispatch,useSelector } from "react-redux";

const Authorizations = () => {
    let dispatcher = useDispatch();
    let authorisations = useSelector(state => state.authorizationPanel.authorisations);
    let [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        isLoading && 
        fetch("/api/authorisation/getAll",{
            method:'get',
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(async(res) => {
            let data = await res.json();
            if(data.length > 0)
            {
                data.map(auth=>{
                    console.log(auth);
                    const modifiedData = {
                        name: auth.name,
                        level: auth.level,
                        agents: auth.agents.map(({ user }) => user.email)
                    };
                    dispatcher(pushAuthorisation(modifiedData))
                })
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            console.log("autho:",authorisations);
            setIsLoading(false)
        })
    })
    return ( 
        <>
            <div className=" flex flex-col items-center w-full">
                
            </div>
        </>
    );
}
 
export default Authorizations;