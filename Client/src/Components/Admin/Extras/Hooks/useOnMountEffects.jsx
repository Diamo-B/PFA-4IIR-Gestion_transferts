import { useEffect } from "react";
import useFetchData from "./useFetchData";
import { setAutomaticExtras, setExtrasToShow, setSpecialExtras } from "../../../../Redux/Admin/extras";
import { useSelector, useDispatch } from "react-redux";

const useOnMountEffects = () => {
    let dispatch = useDispatch();
    let { fetchTypes, fetchExtras } = useFetchData();
    let { extras, automaticExtras, specialExtras, selectedType} = useSelector((state) => state.extras);
    useEffect(() => {
        fetchTypes();
        fetchExtras();
    }, [selectedType]);
    
    useEffect(() => {
        dispatch(setAutomaticExtras(extras.filter((extra) => extra.type.label.toLowerCase() == "automatic")))
        dispatch(setSpecialExtras(extras.filter((extra) => extra.type.label.toLowerCase() == "special")))
    }, [extras]);


    useEffect(() => {
        if(selectedType?.toLowerCase() == "automatic" && automaticExtras.length > 0 )
        {
            dispatch(setExtrasToShow(automaticExtras));
        }
        else if(selectedType?.toLowerCase() == "special" && specialExtras.length > 0 )
        {
            dispatch(setExtrasToShow(specialExtras));
        }
        else
        {
            dispatch(setExtrasToShow([]));
        }
    }, [automaticExtras, specialExtras]);
}

export default useOnMountEffects