import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doneLoading, isLoading } from "../../../../../Redux/Gen/Loading";
import { setToast } from "../../../../../Redux/Gen/toast"
import { setRecommendedVehicles } from "../../../../../Redux/Client/Reservation";
const useOnMountEffects = () => {
    let dispatch = useDispatch();
    let { getValues } = useFormContext();

    useEffect(() => {
        dispatch(isLoading())
        if(!isNaN(getValues("travelers")))
        {
            fetch("/api/vehicule/getAll/Active", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then(async res => {
                let response = await res.json();
                let luxury = getValues("luxury");
                console.log(response, luxury)
                let filtered = response.filter(vehicule => vehicule.lux == luxury && vehicule.places >= getValues("travelers")); 
                dispatch(setRecommendedVehicles(filtered))
            }).catch(err => {
                console.log(err)
                dispatch(setToast({
                    type : "Error",
                    message : "Something went wrong while fetching vehicles",
                    reload: false
                }))
            }).finally(() => {
                dispatch(doneLoading())
            })
        }
    }, [getValues("travelers")]);
}
 
export default useOnMountEffects;