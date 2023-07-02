import TypeButton from "./TypeButton";
import useExtrasManipulation from "../Hooks/useExtrasManipulation";
import { useDispatch, useSelector } from "react-redux";
import { enableCreateMode } from "../../../../Redux/extras";

const TopPanel = () => {
  let { types, selectedType, selectedExtras } = useSelector((state) => state.extras);
  let { deleteSelectedExtras } = useExtrasManipulation();
  let dispatch = useDispatch();

  return (
    <>
      <div className="grid grid-cols-2 justify-items-center">
        {types.length > 0 &&
          types.map((type) =>(
            (!selectedType || selectedType === type.label)
              &&
            <TypeButton  key={type.id} label={type.label} />
          ))
        }
      </div>
      {
        selectedType &&
        <div className="flex justify-center items-center mt-5 gap-5">
          <button 
            className="btn px-5 border-gray-700 text-gray-700 hover:text-white hover:bg-emerald-500"
            onClick={() => {dispatch(enableCreateMode())}}
          >
            Add New {selectedType && selectedType} Extra
          </button>
          {
            selectedExtras.length > 1 &&
            <button className="btn px-5 border-gray-700 text-gray-700 hover:text-white hover:bg-red-500"
              onClick={deleteSelectedExtras}
            >
              Delete All Selected Extras
            </button>
          }
        </div>
      }
    </>
  );
};
export default TopPanel;
