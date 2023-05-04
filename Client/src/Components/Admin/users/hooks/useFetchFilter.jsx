import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const useFetchFilter = (type) => {
    let url;
    switch (type) {
        case "clients":
            url = "/api/client/getAll";
            break;
        case "agents":
            url = "/api/agent/getAll";
            break;
        case "all":
            url = "/api/user/getAll";
            break;
        default:
            url = `/api/user/termSearch/${type}`
    }

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        fetch("/api/verifyJWT",{
            method: 'post',
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(async(res)=>{
            let result = await res.json();
            setCurrentUser(result.email);
        }).catch(err=>{
            console.log(err);
        })
    }, []);

    
    const { isError, data, error, isLoading } = useQuery(
        ["userData", type],
        async () => {
            return fetch(url, {
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
                let object = data.filter(item => item.email !== "Bachar@gmail.com");
                return object;
            })
        }
    );

    return { isError, data, error, isLoading };
};
