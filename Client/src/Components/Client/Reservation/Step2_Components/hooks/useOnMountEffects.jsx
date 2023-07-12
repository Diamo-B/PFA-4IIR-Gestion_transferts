import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doneLoading, isLoading } from "../../../../../Redux/Gen/Loading";
import { setToast } from "../../../../../Redux/Gen/toast"
import { setRecommendedVehicles } from "../../../../../Redux/Client/Reservation";
const useOnMountEffects = () => {
    let dispatch = useDispatch();
    let { getValues } = useFormContext();

    let travelers = null;
    let categoryToPick = null;

    useEffect(() => {
        travelers = getValues("travelers");
        if(travelers)
        {
            travelers <= 6 ? categoryToPick = "Regular"
            :
            travelers > 6 && travelers <=50 ? categoryToPick = "Mini Bus"
            :
            categoryToPick = "Bus"
        }
    },[])

    useEffect(() => {
        dispatch(isLoading())
        if(!isNaN(travelers))
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
                let filtered = response.filter(vehicule => (vehicule.model.label == categoryToPick) && (luxury ? true : !vehicule.lux) );
                let final = filtered.filter(vehicule => vehicule.places >= travelers)
                dispatch(setRecommendedVehicles(final))
                console.log(categoryToPick, filtered);
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