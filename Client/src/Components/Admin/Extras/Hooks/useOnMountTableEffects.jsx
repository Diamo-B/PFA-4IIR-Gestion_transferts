import { useEffect } from "react"
import { useSelector } from "react-redux";
import { resetSelectedExtras } from "../../../../Redux/extras";
import { useDispatch } from "react-redux";

const useOnMountTableEffects = (generalCheckbox) => {

    let { selectedType, extrasToShow, selectedExtras } = useSelector((state) => state.extras);
    let dispatch = useDispatch();

    useEffect(() => {
        if (selectedType && selectedExtras.length === extrasToShow.length)
          generalCheckbox.current.checked = true;
        else 
          generalCheckbox.current.checked = false;
    }, [selectedExtras]);

    useEffect(() => {
    if(selectedType == null)
    {
        generalCheckbox.current.checked = false;
        dispatch(resetSelectedExtras());
    }
    },[selectedType])
}

export default useOnMountTableEffects