import { useDispatch } from "react-redux";
import { setAgents, setAgentsXCatsXPerms, setOptions, setSelectedPermissions } from "../../../Redux/Admin/Authorizations";

const useAuthorizationsManipulations = () => {
    let dispatch = useDispatch();

    //DONE: Getting all categories
    const getAllCategories = () => {
        fetch("/api/category/getAll", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then(async (res) => {
            let categories = await res.json();
            let ops = [];
            categories.map((cat) => {
                ops.push({
                    value: cat.name,
                    label: cat.name,
                });
            });
            dispatch(setOptions(ops));
        }).catch((err) => {
            console.error(err);
        });
    }

    //DONE: Getting all agents except the superAgents
    const getAllAgents = () => {
        fetch("/api/agent/getAll/Normal", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then(async (res) => {
            let agents = await res.json();
            dispatch(setAgents(agents));
        }).catch((err) => {
            console.error(err);
        });
    }

    //DONE: Getting all permissions for each registred agent for the selected category
    let getCategoryPermissions = (selectedCat) =>
    {
        fetch(`/api/authorisation/getByCategoryName/${selectedCat}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then(async (res) => {
            let response = await res.json();
            dispatch(setAgentsXCatsXPerms(response));
            dispatch(setSelectedPermissions(
                response.map((item) => {
                    return {
                        agentId: item.agentId,
                        permissions: item.permissions?.map((perm) => perm?.value)
                    };
                })
            ));
        }).catch((err) => {
            console.error(err);
        });
    }

    return {getAllCategories, getAllAgents, getCategoryPermissions}
}

export default useAuthorizationsManipulations;