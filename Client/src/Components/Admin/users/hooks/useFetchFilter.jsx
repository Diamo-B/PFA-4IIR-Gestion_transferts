import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useFetchFilter = (type) => {
    
    const connectedUser = useSelector(state => state.authUser.value);
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
                return data
            })
        }
    );

    return { isError, data, error, isLoading };
};
