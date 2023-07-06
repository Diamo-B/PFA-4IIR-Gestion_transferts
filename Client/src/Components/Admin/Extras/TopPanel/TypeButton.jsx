import { useDispatch, useSelector } from "react-redux";
import { closeParamsPanel, setSelectedType } from "../../../../Redux/Admin/extras";
import { UilStepBackwardAlt } from '@iconscout/react-unicons'

const TypeButton = ({label}) => {
    const dispatch = useDispatch();
    let { selectedType } = useSelector((state) => state.extras);

    const handleTypeSelection = (type) => {
        if(selectedType === type) return dispatch(setSelectedType(null));
        dispatch(setSelectedType(type));
    };

    return (
        <>
            <button
            className={`btn relative group py-2 w-8/12 ${!selectedType && "hover:bg-emerald-400 hover:text-white"} 
                ${
                    selectedType === label ? "animate-selection" : ""
                } 
                ${
                    selectedType && "translate-x-3/4"
                } 
                ${
                    selectedType &&
                    "border-gray-700 text-gray-700 "
                }
            `}
            onClick={() => dispatch(closeParamsPanel()) && handleTypeSelection(label)}
            >
                {
                    selectedType === label &&
                    <span className="py-2 w-3/12 bg-amber-400 border-2 absolute h-full top-0 left-0 rounded-full justify-center hidden group-hover:flex">
                        <UilStepBackwardAlt/>
                    </span>
                }
                {label}
            </button>
            
        </>
    );
};

export default TypeButton;
