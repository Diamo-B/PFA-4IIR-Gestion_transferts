import {useDispatch} from "react-redux";
import { setUsableData, setGenActivePaths } from "../../../../Redux/Client/activePaths";
import { setToast } from "../../../../Redux/Gen/toast";

const useFetchPaths = () => {
    const dispatch = useDispatch();
    
    let fetchActivePaths = () => {
        fetch("/api/path/getAll/active", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            },
        }).then(async (res) => {
            let response = await res.json();
            if (res.ok) {
                dispatch(setGenActivePaths(response));
                fillUsablePathsArrays(response);
            }
            else {
                console.log(response.message);
                dispatch(
                    setToast({
                      type: "Error",
                      message: response.message,
                      reload: false,
                    })
                )
                dispatch(setGenActivePaths([]));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    let fillUsablePathsArrays = (response) => {
        dispatch(setUsableData(response));
    }

    
    return {fetchActivePaths};
}
 
export default useFetchPaths;