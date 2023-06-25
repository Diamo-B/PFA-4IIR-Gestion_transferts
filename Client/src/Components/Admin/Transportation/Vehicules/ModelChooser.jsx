import Select from "react-select";
import { useEffect } from "react";
import {
  activateLoading,
  disableLoading,
  setOptions,
  setSelectedModel,
} from "../../../../Redux/Transportation";
import { useDispatch, useSelector } from "react-redux";

const ModelChooser = () => {
    let { models } = useSelector((state) => state.transportation.models);
    let { options } = useSelector(
        (state) => state.transportation.vehicules
    );
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(activateLoading());
        dispatch(setOptions(models));
        dispatch(disableLoading());
    }, [models]);


    return ( 
        <div className="flex items-center justify-center py-2 z-50">
            <Select
            placeholder="Choose a Model"
            className="text-center font-bold w-1/4 text-gray-700"
            styles={{
                container: (baseStyles, state) => ({
                ...baseStyles,
                boxShadow: "none",
                }),
                control: (baseStyles, state) => ({
                ...baseStyles,
                outline: "none",
                border: "2px solid black",
                borderRadius: 10 + "px",
                boxShadow: state.isFocused ? "none" : "none",
                "&:hover": {
                    boxShadow: "none",
                },
                }),
            }}
            isSearchable={true}
            isClearable={true}
            options={options}
            onChange={(opt) => {
                if (opt?.value) dispatch(setSelectedModel(opt));
                else dispatch(setSelectedModel(null));
            }}
            />
        </div>
    );
}
 
export default ModelChooser;