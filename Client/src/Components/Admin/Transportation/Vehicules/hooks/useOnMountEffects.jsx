import { useEffect } from "react";
import { resetVehicles, setVehicles } from "../../../../../Redux/Admin/Transportation";
import { doneLoading, isLoading } from "../../../../../Redux/Gen/Loading";
import { setToast } from "../../../../../Redux/Gen/toast";
import { useDispatch, useSelector } from "react-redux";

const useOnMountEffects = ({errors}) => {

    let dispatch = useDispatch();

    let { selectedModel } = useSelector(state => state.transportation.vehicules);


    useEffect(() => {
        dispatch(resetVehicles());
        if (selectedModel) {
            dispatch(isLoading());
            fetch(`/api/vehicule/getByModel/${selectedModel.label}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then(async (res) => {
                let response = await res.json();
                if (response.err) {
                    dispatch(setToast({
                        type: "Error",
                        message: response.err,
                        reload: false
                    }))
                } else
                    dispatch(setVehicles(response))
            }).catch(async (err) => {
                console.error(err);
            }).finally(()=>{
                dispatch(doneLoading())
            })
        }
    }, [selectedModel])

    //shows form errors
    useEffect(() => {
        const errorMessages = Object.values(errors)
          .map((error) => error.message)
          .filter(Boolean)
          .join('\n');
      
        if (errorMessages) {
          dispatch(
            setToast({
              type: "Error",
              message: errorMessages,
              reload: false,
            })
          );
        }
    }, [errors]);

}
 
export default useOnMountEffects;