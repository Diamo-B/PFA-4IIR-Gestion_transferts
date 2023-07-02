import { useDispatch, useSelector } from "react-redux";
import { setExtras, setTypes } from "../../../../Redux/extras";
import { SetToast } from "../../../../Redux/toast";

const useFetchData = () => {
    const dispatch = useDispatch();
    let { extras } = useSelector((state) => state.extras);
    const fetchTypes = () => {
        fetch("/api/extra/types/getAll",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        }).then(async(res)=>{
            let resTypes = await res.json();
            dispatch(setTypes(resTypes));
        }).catch(async(err)=>{
            console.error(err);
            dispatch(SetToast({
                type:"Error",
                message:"An unknown error occured while fetching the data",
                reload: false
            }));
        })
    }

    const fetchExtras = () => {
        fetch("/api/extra/getAll",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        }).then(async(res)=>{
            let resExtras = await res.json();
            dispatch(setExtras(resExtras));
        }).catch(async(err)=>{
            console.error(err);
            dispatch(SetToast({
                type:"Error",
                message:"An unknown error occured while fetching the data",
                reload: false
            }));
        })
    }

    return { fetchTypes, fetchExtras };
}

export default useFetchData;